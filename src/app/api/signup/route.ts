import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { z } from 'zod';

import {
  authSchema,
  COOKIES_HOURS_ACCESS,
  COOKIES_HOURS_REFRESH,
  EXPIRES_HOURS_ACCESS,
  EXPIRES_HOURS_REFRESH,
  serverMessages,
  statusCodes,
} from '@/shared/config';

import { ErrorResponse, UserResponse } from '../types';
import prisma from '@/shared/lib/prisma';

const { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR, CREATED } = statusCodes;
const { USER_EXISTS, SUCCESS_REGISTRATION, SERVER_ERROR, MISSING_SECRETS } = serverMessages;

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error(MISSING_SECRETS);
}

const encoder = new TextEncoder();
const accessSecret = encoder.encode(ACCESS_SECRET);
const refreshSecret = encoder.encode(REFRESH_SECRET);

const expiresAtRefresh = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export async function POST(req: NextRequest): Promise<NextResponse<UserResponse | ErrorResponse>> {
  try {
    const getUserIp =
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      'unknown';
    const getUserAgent = req.headers.get('user-agent') || '';

    const { username, password } = authSchema.parse(await req.json());

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return NextResponse.json({ message: USER_EXISTS }, { status: CONFLICT });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    const accessToken = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(EXPIRES_HOURS_ACCESS)
      .sign(accessSecret);

    const refreshToken = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(EXPIRES_HOURS_REFRESH)
      .sign(refreshSecret);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: expiresAtRefresh,
        ipAddress: getUserIp,
        userAgent: getUserAgent,
      },
    });

    const filteredUser = { id: user.id, username: user.username };
    const response = NextResponse.json(
      { message: SUCCESS_REGISTRATION, filteredUser },
      { status: CREATED },
    );

    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: 'strict',
      maxAge: COOKIES_HOURS_ACCESS,
    });

    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: 'strict',
      maxAge: COOKIES_HOURS_REFRESH,
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);

    if (error instanceof z.ZodError) {
      const errorMessage = error.errors[0].message;
      return NextResponse.json({ message: errorMessage }, { status: BAD_REQUEST });
    }

    return NextResponse.json({ message: SERVER_ERROR }, { status: INTERNAL_SERVER_ERROR });
  }
}
