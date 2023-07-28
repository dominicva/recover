import './globals.css';
import { Hanken_Grotesk } from 'next/font/google';
import NextAuthProvider from './providers';
import type { Metadata } from 'next';

const hankenGrotesk = Hanken_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recover',
  description: 'An AI-assisted mood tracker to help you move past addiction.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${hankenGrotesk.className} text-off-black`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
