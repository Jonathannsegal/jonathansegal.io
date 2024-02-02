import Head from 'next/head';
import { useRouter } from 'next/router';

import Footer from 'components/Footer';
// import MobileMenu from 'components/MobileMenu';

export default function Container(props) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Jonathan Segal',
    description: `Phd Student, AR/VR Devloper, and New Yorker.`,
    image: 'https://jonathansegal.io/static/images/jonathan-banner.png',
    type: 'website',
    ...customMeta
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://jonathansegal.io${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://jonathansegal.io${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Jonathan Segal" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jonathannsegal" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <div className="flex flex-col justify-center px-8">
        <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-6 text-gray-900 bg-gray-50 dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
          <a href="#skip" className="skip-nav">
            Skip to content
          </a>
          <h1 className="font-bold text-2xl md:text-4xl tracking-tight mb-1 text-black dark:text-white">
            Jonathan Segal
          </h1>
          <div className="ml-[-0.60rem]">
            {/* <MobileMenu /> */}
          </div>
        </nav>
      </div>
      <main
        id="skip"
        className="flex flex-col justify-center px-8 bg-white dark:bg-gray-900"
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
