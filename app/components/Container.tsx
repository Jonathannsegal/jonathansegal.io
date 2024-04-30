import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';

import Footer from 'components/Footer';

export default function Container(props) {
  const [mounted, setMounted] = useState(false);
  // const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Jonathan Segal',
    description: `Phd Student, AR/VR Devloper, and New Yorker.`,
    image: 'https://jonathansegal.io/static/images/jonathan-banner.png',
    type: 'website',
    ...customMeta
  };

  const headerText = [
    { text1: "Jonathan", text2: "Segal", probability: 0.3 },
    { text1: "2nd Year", text2: "PhD Student", probability: 0.2 },
    { text1: "New", text2: "Yorker", probability: 0.1 },
    { text1: "HCI", text2: "Researcher", probability: 0.1 },
    { text1: "Go", text2: "Big Red", probability: 0.1 },
    { text1: "Cyclone", text2: "Power", probability: 0.1 },
    { text1: "Loading", text2: "...", probability: 0.1 },
  ];

  useEffect(() => {
    const heading = document.getElementById('animated-heading');
    const spans = document.querySelectorAll('#animated-heading span');
    let fullName = [headerText[0].text1, headerText[0].text2];
    let lastIndex = 0;
    let animationFrame;
    let lastUpdateTime = 0;
    const updateInterval = 70;

    const maxTextLength = headerText.reduce((max, item) => Math.max(max, item.text1.length, item.text2.length), 0);
    const minTextLength = headerText.reduce((min, item) => Math.min(min, item.text1.length, item.text2.length), Infinity);

    function randomChar() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
      return characters[Math.floor(Math.random() * characters.length)];
    }

    function animateCharacters() {
      const maxDuration = 800;
      let startTime = performance.now();

      function updateAnimation() {
        let currentTime = performance.now();
        let elapsed = currentTime - startTime;
        let progress = elapsed / maxDuration;
        if (currentTime - lastUpdateTime > updateInterval) {
          lastUpdateTime = currentTime;
          const currentText = fullName.map(() => Array(maxTextLength).fill(' ').join('').split(''));
          fullName.forEach((part, index) => {
            for (let i = 0; i < maxTextLength; i++) {
              let pos = Math.floor(Math.random() * maxTextLength);
              if (pos < part.length && Math.random() < progress) {
                currentText[index][pos] = part[pos];
              } else if (pos < part.length) {
                currentText[index][pos] = randomChar();
              }
            }
            (spans[index] as HTMLElement).innerText = currentText[index].slice(0, Math.max(part.length, minTextLength)).join('');
          });
        }

        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateAnimation);
        } else {
          (spans[0] as HTMLElement).innerText = fullName[0];
          (spans[1] as HTMLElement).innerText = fullName[1];
          if (!heading.classList.contains('initialized')) {
            heading.classList.add('initialized');
          } else {
            let random;
            let newIndex;
            do {
              random = Math.random();
              let cumulativeProbability = 0;
              for (let i = 0; i < headerText.length; i++) {
                cumulativeProbability += headerText[i].probability;
                if (random < cumulativeProbability) {
                  newIndex = i;
                  break;
                }
              }
            } while (newIndex === lastIndex);
            fullName = [headerText[newIndex].text1, headerText[newIndex].text2];
            lastIndex = newIndex;
          }
        }
      }
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateAnimation);
    }

    const clickListener = () => animateCharacters();
    heading.addEventListener('click', clickListener);

    animateCharacters();

    return () => {
      heading.removeEventListener('click', clickListener);
      cancelAnimationFrame(animationFrame);
    };
  }, []);


  return (
    <div className='bg-white dark:bg-gray-900'>
      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content='follow, index' />
        <meta content={meta.description} name='description' />
        <meta
          property='og:url'
          content={`https://jonathansegal.io${router.asPath}`}
        />
        <link
          rel='canonical'
          href={`https://jonathansegal.io${router.asPath}`}
        />
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content='Jonathan Segal' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
        <meta property='og:image' content={meta.image} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@jonathannsegal' />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:image' content={meta.image} />
        {meta.date && (
          <meta property='article:published_time' content={meta.date} />
        )}
      </Head>
      <div className='font-sans flex flex-col justify-center px-8'>
        <nav className='flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-6 text-gray-900 bg-white dark:bg-gray-900 bg-opacity-60 dark:text-gray-100'>
          <a href='#skip' className='skip-nav'>
            Skip to content
          </a>
          <h1 id='animated-heading' className='cursor-pointer select-none text-2xl md:text-3xl mb-1 text-black dark:text-white'>
            <span className='tracking-tight hover:tracking-wide'>Jonathan</span> <span className='font-bold tracking-wide hover:tracking-widest'>Segal</span>
          </h1>
          <div className='ml-[-0.60rem]'>
            <button
              className='text-gray-500 hover:text-gray-600 transition text-left'
            // onClick={() =>
            //   setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            // }
            >
              {/* {mounted && (resolvedTheme === 'dark' ? 'Light' : 'Dark')} */}
            </button>
          </div>
        </nav>
      </div>
      <main
        id='skip'
        className='flex flex-col justify-center px-8 bg-white dark:bg-gray-900'
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
