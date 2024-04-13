import React from 'react';

const About = () => {
    return (
        <>
            <h2 className='font-medium text-3xl tracking-tight pt-5 text-black dark:text-white'>
                About
            </h2>
            <div className='grid grid-cols-1 gap-0 sm:gap-6 sm:grid-cols-2'>
                <p className='mb-3 text-justify font-light text-md tracking-tight text-gray-500 dark:text-gray-400'>
                    I'm a second-year PhD student in Information Science at{' '}
                    <a
                        href='https://infosci.cornell.edu/content/segal'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-700'
                    >
                        Cornell University
                    </a>
                    , where I'm advised by{' '}
                    <a
                        href='https://tech.cornell.edu/people/angelique-taylor/'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-700'
                    >
                        Angelique Taylor
                    </a>
                    . I am a part of {' '}
                    <a
                        href='https://airlab.cis.cornell.edu/'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-700'
                    >
                        AIRLab
                    </a>
                    , where I've been exploring technological solutions to improve
                    outcomes in emergency response and healthcare. My research interests
                    lie at the intersection of Human-Computer Interaction, Computer-Supported
                    Cooperative Work, and Augmented/Mixed Reality. I'm excited about
                    the potential for new uses of AR/VR. Recently I've
                    been investigating how AR can be used in emergency medicine
                </p>
                <p className='mb-3 text-md text-justify font-light tracking-tight text-gray-500 dark:text-gray-400'>
                    Prior to joining Cornell, I've worked as a Research Assistant at{' '}
                    <a
                        href='https://www.iastate.edu/'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700'
                    >
                        Iowa State Universiy
                    </a>{' '}
                    in the{' '}
                    <a
                        href='https://cals.cornell.edu/andrea-stevenson-won'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700'
                    >
                        Virtual Reality Applications Center
                    </a>
                    , with{' '}
                    <a
                        href='https://www.imse.iastate.edu/directory/profile/gilbert/'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700'
                    >
                        Stephen Gilbert
                    </a>{' '}
                    and{' '}
                    <a
                        href='https://www.imse.iastate.edu/dorneich/'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700'
                    >
                        Michael Dorneich
                    </a>
                    . There, I developed a testbed to assess teaming behaviors and
                    explore human agent teams in VR. I have also done
                    research at the{' '}
                    <a
                        href='https://www6.slac.stanford.edu/'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700'
                    >
                        SLAC National Accelerator Laboratory
                    </a>{' '}
                    where I worked with{' '}
                    <a
                        href='https://sites.google.com/view/jeffshrager-org/home'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700'
                    >
                        Jeff Shrager
                    </a>{' '}
                    and{' '}
                    <a
                        href='https://profiles.stanford.edu/wan-lin-hu'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700'
                    >
                        Wan-Lin Hu
                    </a>
                    . I've also had internships at{' '}
                    <a
                        href='https://www.blackrock.com/aladdin'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700'
                    >
                        BlackRock
                    </a>
                    ,{' '}
                    <a
                        href='https://www.dwolla.com/updates/my-crazy-summer-internship/?utm_campaign=Ongoing-Social&utm_content=136222797&utm_medium=social&utm_source=twitter&hss_channel=tw-84909450'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700'
                    >
                        Dwolla
                    </a>
                    , and{' '}
                    <a
                        href='https://www.corteva.com/'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700'
                    >
                        Corteva
                    </a>
                    . I'm always interested in talking about interesting ideas or
                    projects, {' '}
                    <a
                        href='https://calendar.app.google/rQoseKnSSMrb1iPL9'
                        className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700'
                    >
                        schedule a time to chat!
                    </a>
                </p>
            </div>
        </>
    );
};

export default About;