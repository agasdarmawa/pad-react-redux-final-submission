import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/components/StoreProvider';
import { LoadingBarProvider } from '@/contexts/LoadingBarContext';
import AppLayoutWrapper from '@/components/AppLayoutWrapper';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: 'Forum App | %s',
    default: 'Forum App',
  },
  description: 'Forum App powered by Dicoding',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
          <AppLayoutWrapper>
            <LoadingBarProvider>{children}</LoadingBarProvider>
          </AppLayoutWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
