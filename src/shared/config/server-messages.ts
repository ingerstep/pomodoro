export const serverMessages = {
  AUTH_REQUIRED: 'Authorization required',
  FIELDS_REQUIRED: 'All fields are required',
  USER_EXISTS: 'User already exists',
  INVALID_TOKEN: 'Invalid token',
  INCORRECT_DATA: 'Incorrect data',
  SERVER_ERROR: 'Server error',
  SUCCESS_LOGIN: 'Login successfully',
  SUCCESS_REGISTRATION: 'Registration successfully',
  SUCCESS_LOGOUT: 'Logout successfully',
  REFRESH_TOKEN_MISSING: 'Refresh token is missing',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  REFRESH_TOKEN_EXPIRED: 'Invalid or expired refresh token',
  MISSING_SECRETS: 'Missing ACCESS_SECRET or REFRESH_SECRET environment variables',
  INVALID_USER_IN_TOKEN: 'Invalid userId in token',
  INVALID_ACCESS_TOKEN: 'Access token invalid or expired, proceed to refresh',
  USER_NOT_FOUND: 'User not found',
} as const;
