import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Heebo } from 'next/font/google';

const heebo = Heebo({ subsets: ['latin'] })

export default function App({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <main className={heebo.className}>
        <Component {...pageProps} />
        <SpeedInsights />
      </main>
    </ThemeProvider>
  );
}
