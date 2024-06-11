import './global.css';
import type { Metadata } from 'next';

import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://jonathansegal.io'),
  title: {
    default: 'Jonathan Segal',
    template: '%s | Jonathan Segal',
  },
  description: 'Researcher, devloper, and New Yorker.',
  openGraph: {
    title: 'Jonathan Segal',
    description: 'Researcher, devloper, and New Yorker.',
    url: 'https://jonathansegal.io',
    siteName: 'Jonathan Segal',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Jonathan Segal',
    card: 'summary_large_image',
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx('text-black bg-white dark:text-white dark:bg-[#111010]')}>
      <head>
        {/* <SandpackCSS /> */}
      </head>
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
