import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <button
            className="text-gray-500 hover:text-gray-600 transition text-left"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && (resolvedTheme === 'dark' ? 'Light' : 'Dark')}
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText('jis62@cornell.edu');
            }}
            className="text-gray-500 hover:text-gray-600 transition text-left"
          >
            Contact
          </button>
          <ExternalLink href="https://scholar.google.com/citations?user=Wr3zbI8AAAAJ">
            Publications
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://jonathansegal.io/static/images/Jonathan_Segal_Resume.pdf">
            Resume
          </ExternalLink>
          <ExternalLink href="https://github.com/Jonathannsegal">
            GitHub
          </ExternalLink>
          <ExternalLink href="https://www.linkedin.com/in/jonathannsegal/">
            Linkedin
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://twitter.com/jonathannsegal">
            Twitter
          </ExternalLink>
          <ExternalLink href="https://www.facebook.com/jonathannsegal/">
            Facebook
          </ExternalLink>
          <ExternalLink href="https://dribbble.com/Jonathansegal">
            Dribbble
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
}
