import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import profilePic from '../public/jonathan.jpg';
import Container from '../components/Container';
import About from 'components/About';
import Research from 'components/Research';
import Personal from 'components/Personal';

interface TabProps {
  id: number;
  title: string;
}

const tabsData: TabProps[] = [
  { id: 1, title: 'About'},
  { id: 2, title: 'Research'},
  { id: 3, title: 'Personal'}
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const updateIndicator = () => {
      const currentTab = tabsRef.current[activeTab - 1];
      if (currentTab) {
        setIndicatorStyle({
          width: `${currentTab.offsetWidth}px`,
          left: `${currentTab.offsetLeft}px`,
          transition: 'left 200ms ease-in-out, width 200ms ease-in-out'
        });
      }
    };
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeTab]);

  let activeContent;
  switch (activeTab) {
    case 1:
      activeContent = <About />;
      break;
    case 2:
      activeContent = <Research />;
      break;
    case 3:
      activeContent = <Personal />;
      break;
    default:
      activeContent = null;
  }

  return (
    <Container>
      <div className='font-sans flex flex-col justify-center items-start w-full max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-0 sm:pb-8'>
        <div className='flex flex-col justify-between w-full'>
          <Image
            src={profilePic}
            priority={true}
            alt='Profile picture'
            className='rounded-t-lg h-72 object-cover'
          />
        </div>


        <div className='rounded-b-lg w-full text-center bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5'>
          <div className="flex justify-between rounded-lg relative">
            <div className="absolute my-1 left-0 inset-y-0 bg-black dark:bg-white rounded-lg z-0" style={indicatorStyle} />
            {tabsData.map((tab, index) => (
              <button
                key={tab.id}
                ref={el => tabsRef.current[index] = el}
                className={`py-2 m-1 w-full rounded-lg ${activeTab === tab.id ? 'text-white dark:text-black' : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900'}`}
                style={{ zIndex: 1 }}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
        {activeContent}
      </div>
    </Container>
  );
}
