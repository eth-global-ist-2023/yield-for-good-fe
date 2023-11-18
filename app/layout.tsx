import ChainsSlider from '@/components/ChainsSlider';
import Header from '@/components/Header';
import Providers from '@/components/providers';
import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import './globals.css';

const sans = Titillium_Web({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Yield for good',
  description: 'Yield for good description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={sans.className}>
        <Providers>
          <div className='main-container'>
            <Header />
            <ChainsSlider />
            <div className='page-wrapper'>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
