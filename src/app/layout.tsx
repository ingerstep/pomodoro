import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Roboto } from 'next/font/google';
import clsx from 'clsx';

import './globals.css';

const roboto = Roboto({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '500', '400', '700', '100'],
});

export const metadata: Metadata = {
  title: 'Pomodoro',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          roboto.className,
          'text-2xl text-[#333] dark:bg-[#34495E] dark:text-[#BDC3C7]',
        )}
      >
        <main>{children}</main>
        <div id='modal' />
      </body>
    </html>
  );
}
