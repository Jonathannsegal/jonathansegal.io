import type { Metadata } from 'next';
import { people } from './people';
import Link from 'next/link';
import Image from 'next/image'
import { differenceInMonths, format, parseISO, formatDistanceToNow } from 'date-fns';

export const metadata: Metadata = {
  title: 'Work',
  description: 'A summary of my work and contributions.',
};

function Publication({ author, cofirst, year, title, booktitle = '', conference, date, address, doi }) {
  const authorLinks = author.map(orcid => {
    const foundAuthor = people.find(author => author.orcid === orcid);
    const isCoFirst = cofirst !== false && cofirst.includes(orcid);
    if (foundAuthor) {
      return {
        name: `${foundAuthor.lastName}, ${foundAuthor.firstName.charAt(0)}.`,
        url: foundAuthor.url,
        isInternal: foundAuthor.orcid === '0000-0002-8506-3785',
        isCoFirst
      };
    }
    return { name: 'Unknown Author', url: '#', isInternal: false };
  });

  const formattedAuthors = authorLinks.map((author, index) => (
    <span key={index} className='mr-1'>
      <Link href={author.url} target='_blank' rel='noopener noreferrer'
        className={`${author.isInternal ? 'font-bold' : ''} hover:underline underline-offset-2 decoration-[0.1em] transition duration-300 ease-in-out dark:text-white`}>
        {author.name}{author.isCoFirst ? '*' : ''}
      </Link>
      {index < authorLinks.length - 1 ? ', ' : ''}
    </span>
  ));

  return (
    <div className='mb-4'>
      <span className='text-sm text-gray-700 dark:text-gray-300'>
        {formattedAuthors}
      </span>
      <span className='text-sm text-gray-800 dark:text-gray-200'>
        {/* <span>({year}) </span> */}
        <Link href={doi} target='_blank' rel='noopener noreferrer' className='italic text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500'>
          {title}.
        </Link>
        <span> {conference}, </span>
        <span>{year}. </span>
      </span>
      {cofirst !== false && (
        <div className='text-xs text-gray-600 dark:text-gray-400 mt-1'>
          * Authors contributed to this work equally
        </div>
      )}
    </div>
  );
}

function Class({ subject, number, url, title, semester, year, instructor, role, responsibilities, university, description }) {
  const instructorInfo = people.find(person => person.orcid === instructor);

  const instructorName = instructorInfo ? (
    <Link href={instructorInfo.url || '#'} className='hover:underline underline-offset-2 decoration-[0.1em] transition duration-300 ease-in-out dark:text-white'>
      {instructorInfo.lastName}, {instructorInfo.firstName.charAt(0)}.
    </Link>
  ) : 'Unknown Instructor';

  return (
    <div className='mb-4'>
      <Link href={url} className='text-md font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500'>
        {subject} {number} - {title}
      </Link>
      <p>
        <span className='text-sm text-gray-600 dark:text-gray-400'>{role}, {semester} {year} at {university}, </span>
        <span className='text-sm text-gray-500 dark:text-gray-300'>Instructor: {instructorName}</span>
      </p>
    </div>
  );
}

function Course({ name, description, url }) {
  return (
    <li className='text-xs text-gray-600 dark:text-gray-400'>
      <Link href={url} className='hover:text-blue-600 dark:hover:text-blue-500'>
        {name}
      </Link>: {description}
    </li>
  );
}

function Advisor({ orcid }) {
  const advisor = people.find(person => person.orcid === orcid);
  if (!advisor) {
    return <span>Unknown Advisor</span>;
  }
  return (
    <span>
      <Link href={advisor.url} className='hover:text-blue-600 dark:hover:text-blue-500'>
        {advisor.lastName}, {advisor.firstName.charAt(0)}.
      </Link>
    </span>
  );
}

function Education({ degree, field, school, schoolUrl, schoolSeal, url, location, description, startYear, endYear, courses, showCourses = false, advisors }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  const groupedAdvisors = advisors.reduce((acc, advisor) => {
    const { role } = advisor;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(<Advisor key={advisor.orcid} {...advisor} />);
    return acc;
  }, {});

  const advisorsDisplay = Object.entries(groupedAdvisors).map(([role, advisorComponents], index) => (
    <span key={index}>
      {role}: {
        (advisorComponents as any[]).reduce((prev, curr, index) => {
          return [
            ...prev,
            index > 0 ? ', ' : '',
            curr,
            index === (advisorComponents as any[]).length - 1 ? ' ' : ''
          ];
        }, [])
      }
    </span>
  ));

  const displayYears = startYear === endYear ? startYear : `${startYear} - ${endYear}`;

  return (
    <div className='mb-6 flex'>
      <Image src={schoolSeal} alt={`Seal of ${school}`} width={12} height={12} className='w-12 h-12 mr-4 dark:invert' />
      <div className='flex-1'>
        <Link href={url} className='text-md sm:text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500'>
          {degree}{field && ` in ${field}`}
        </Link>
        <span className='text-gray-700 dark:text-gray-300'>{', '}</span>
        <span className='text-sm sm:text-md text-gray-600 dark:text-gray-400'>
          {displayYears}
        </span>
        <div className='text-xs sm:text-sm'>
          <Link href={schoolUrl} className='font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500'>
            {school}
          </Link>
          <span className='text-gray-700 dark:text-gray-300'>{', '}</span>
          <span className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'>
            <Link href={mapsUrl} target='_blank' rel='noopener noreferrer'>{location}</Link>
          </span>
        </div>
        {advisors && advisors.length > 0 && (
          <div className='mt-1 text-sm'>
            {advisorsDisplay}
          </div>
        )}
        {showCourses && courses && courses.length > 0 && (
          <ul className='mt-2'>
            {courses.map((course, index) => (
              <Course key={index} {...course} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Experience({ title, company, companyUrl, location, startDate, endDate, description }) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const duration = differenceInMonths(end, start);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  return (
    <div className='mb-4'>
      <div className='text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500'>
        <Link href={companyUrl} target='_blank' rel='noopener noreferrer'>{company}</Link>
      </div>
      <div className='text-lg text-gray-700 dark:text-gray-300'>
        {title}
      </div>
      <div className='text-sm text-gray-500 dark:text-gray-300'>
        {format(start, 'MMM yyyy')} - {format(end, 'MMM yyyy')} · {duration} months
      </div>
      <div className='text-sm text-gray-600 dark:text-gray-400'>
        <Link href={mapsUrl} target='_blank' rel='noopener noreferrer'>{location}</Link>
      </div>
      {/* <p className='text-gray-700 dark:text-gray-300 mt-1'>
        {description}
      </p> */}
    </div>
  );
}

function Affiliations({ role, lab, labUrl, lead, institution, institutionUrl, location, startDate, endDate, description }) {
  // Date parsing and formatting
  const start = parseISO(startDate);
  let end;
  let duration;

  if (endDate.toLowerCase() === 'present') {
    duration = `${format(start, 'MMM yyyy')} - Present`;
    // duration = `${format(start, 'MMM yyyy')} - Present (${formatDistanceToNow(start, { addSuffix: false })})`;
  } else {
    end = parseISO(endDate);
    duration = `${format(start, 'MMM yyyy')} - ${format(end, 'MMM yyyy')}`;
  }

  // Finding the lead person
  const leadPerson = people.find(person => person.orcid === lead) || { firstName: 'Unknown', lastName: 'Lead', url: '#' };

  return (
    <div className='mb-4'>
      {/* <div className='text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500'>
        <Link href={labUrl} target='_blank' rel='noopener noreferrer'>{lab}</Link>
      </div> */}
      <div className='text-md text-gray-700 dark:text-gray-300'>
        <Link href={labUrl} target='_blank' rel='noopener noreferrer' className='font-semibold'>{lab}</Link>
      </div>
      <div className='text-sm text-gray-500 dark:text-gray-300'>
        <span>{role}</span>{', '}<span>Duration: {duration}</span>
      </div>
      <div className='text-sm text-gray-600 dark:text-gray-400'>
        <Link href={institutionUrl} target='_blank' rel='noopener noreferrer'>{institution}</Link>,
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`} target='_blank' rel='noopener noreferrer' className='hover:text-blue-600 dark:hover:text-blue-500'> {location}</a>
      </div>
      <div className='text-sm text-gray-700 dark:text-gray-300'>
        Lead: <Link href={leadPerson.url} className='hover:text-blue-600 dark:hover:text-blue-500'>{leadPerson.lastName}, {leadPerson.firstName.charAt(0)}.</Link>
      </div>
      {/* <p className='text-gray-700 dark:text-gray-300 mt-1'>
        {description}
      </p> */}
    </div>
  );
}

function Talk({ title, venue, link }) {
  return (
    <div className='mb-4'>
      <p className='text-md font-medium text-gray-800 dark:text-gray-200'>
        <Link href={link}>{title}</Link>, {venue}
      </p>
    </div>
  );
}

function Project({ title, event, description, url }) {
  return (
    <div className='mb-4'>
      <p className='text-md font-medium text-gray-800 dark:text-gray-200'>
        {title}, {event}
      </p>
    </div>
  );
}

function Service({ role, organization, organizationShortName, organizationUrl, startDate, endDate, description }) {
  const start = parseISO(startDate);
  let end, durationString, totalDuration;

  if (endDate.toLowerCase() === 'present') {
    end = new Date();
    durationString = `${format(start, 'MMM yyyy')} - Present`;
    const durationMonths = differenceInMonths(end, start);
    if (durationMonths < 12) {
      totalDuration = `${durationMonths} month${durationMonths === 1 ? '' : 's'}`;
    } else {
      const years = Math.floor(durationMonths / 12);
      const months = durationMonths % 12;
      totalDuration = `${years} year${years === 1 ? '' : 's'}` + (months ? ` ${months} month${months === 1 ? '' : 's'}` : '');
    }
  } else {
    end = parseISO(endDate);
    const durationMonths = differenceInMonths(end, start);
    if (durationMonths === 0) {
      durationString = format(start, 'yyyy');
    } else {
      durationString = `${format(start, 'MMM yyyy')} - ${format(end, 'MMM yyyy')}`;
      if (durationMonths < 12) {
        totalDuration = `${durationMonths} month${durationMonths === 1 ? '' : 's'}`;
      } else {
        const years = Math.floor(durationMonths / 12);
        const months = durationMonths % 12;
        totalDuration = `${years} year${years === 1 ? '' : 's'}` + (months ? ` ${months} month${months === 1 ? '' : 's'}` : '');
      }
    }
  }

  return (
    <div className='mb-2'>
      <div className='text-md font-medium text-gray-800 dark:text-gray-200'>
        <span className='font-semibold'>{role}</span>{', '}<Link href={organizationUrl} target='_blank' rel='noopener noreferrer'>{organizationShortName}</Link>{', '}
        <span className='text-sm text-gray-500 dark:text-gray-300'>
          {durationString}{totalDuration && ` · ${totalDuration}`}
        </span>
      </div>
      {/* <p className='text-gray-700 dark:text-gray-300 mt-1'>
        {description}
      </p> */}
    </div>
  );
}

export default function Page() {
  return (
    <section>
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Research Interests</h1>
      <p className='prose prose-neutral dark:prose-invert max-w-none text-pretty'>
        I envision a future where first responders receive support from cutting-edge technology, ensuring consistent service quality regardless of the time. Augmented reality could be crucial in aiding healthcare workers with various tasks, from coordinating teams to remote assistance. Integrating AR headsets into the emergency medical system toolkit for first responders, EMTs, and paramedics that can enhance the speed and quality of care. Given that the U.S. EMS system is overburdened, leveraging such technological support could save lives.
        <br /><br />
        My PhD work specifically focuses on how augmented and virtual reality systems can improve medical workflows. I have worked on various AR/VR applications, including education, accessibility, and teamwork. My current work is on various AR applications to support HCWs in the emergency department.
      </p>
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Publications</h1>
      <Publication
        author={[
          '0009-0003-4643-4111',
          '0000-0002-8506-3785'
        ]}
        cofirst={false}
        year='2025'
        title='MazeWorld: A Multiplayer 3D Research Testbed for Human Teaming, AI Agent Integration, and Multiple XR Disciplines'
        booktitle='Communications in Computer and Information Science'
        conference='HCII'
        address='Gothenburg, Sweden'
        date='June 22--27, 2025'
        doi='https://doi.org/10.1007/978-3-031-94162-7_30'
      />
      <Publication
        author={[
          '0000-0002-8506-3785',
          'WH',
          '0000-0002-3714-7239',
          'FR',
          '0000-0002-7007-6305'
        ]}
        cofirst={false}
        year='2025'
        title='A multi-scale cognitive interaction model of instrument operations at the Linac Coherent Light Source'
        booktitle='Review of Scientific Instruments'
        conference='Rev. Sci. Instrum.'
        address='Gothenburg, Sweden'
        date='Jan 29, 2025'
        doi='https://doi.org/10.1063/5.0239302'
      />
      <Publication
        author={[
          '0000-0002-8506-3785',
          '0000-0003-2501-0304',
          '0009-0002-6167-6955',
          '0009-0002-7266-9785',
          '0000-0003-4434-1723',
          '0000-0001-6850-5820',
          '0000-0002-6701-4066',
          '0000-0001-5240-6166'
        ]}
        cofirst={false}
        year='2024'
        title='SocialCueSwitch: Towards Customizable Accessibility by Representing Social Cues in Multiple Senses'
        booktitle='Extended Abstracts of the CHI Conference on Human Factors in Computing Systems'
        conference='CHI EA'
        address='Honolulu, HI, USA'
        date='May 11--16, 2024'
        doi='https://doi.org/10.1145/3613905.3651109'
      />
      <Publication
        author={[
          '0009-0002-2264-896X',
          '0000-0002-8506-3785',
          '0000-0002-0880-077X',
          '0000-0001-5240-6166'
        ]}
        cofirst={['0009-0002-2264-896X', '0000-0002-8506-3785']}
        year='2024'
        title='Just Look at Them! Encouraging Self-Reflection on Teacher Gaze Behavior through Data Visualizations in Virtual Reality'
        booktitle='Proceedings of the ACM Conference on Human Factors in Computing Systems'
        conference='CHI EA'
        address='Honolulu, HI, USA'
        date='May 11--16, 2024'
        doi='https://doi.org/10.1145/3613905.3651105'
      />
      <Publication
        author={[
          'RF',
          '0000-0002-8506-3785',
          'YF',
          'JR',
          '0000-0001-6386-4787',
          '0000-0002-5332-029X'
        ]}
        cofirst={false}
        year='2022'
        title='MazeWorld: A Game-Based Environment developed to Assess Teaming Behaviors'
        booktitle='Proceedings of the Human Factors and Ergonomics Society Annual Meeting'
        conference='HFES'
        address='Atlanta, GA, USA'
        date='October 10--14, 2022'
        doi='https://doi.org/10.1177/1071181322661180'
      />
      <Publication
        author={[
          '0000-0002-4170-9986',
          '0000-0001-6386-4787',
          '0000-0003-4190-1414',
          'WF',
          '0000-0001-5481-9423',
          '0000-0002-8506-3785',
          '0000-0003-0721-3060',
          'EC',
          'KT'
        ]}
        cofirst={false}
        year='2021'
        title='The effectiveness of adaptive training for stress inoculation in a simulated astronaut task'
        booktitle='Proceedings of the Human Factors and Ergonomics Society Annual Meeting'
        conference='HFES'
        address='Baltimore, MD, USA'
        date='October 4--7, 2021'
        doi='https://doi.org/10.1177/1071181321651241'
      />
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Education</h1>
      <Education
        degree='PhD'
        field='Information Science'
        school='Cornell University'
        schoolUrl='https://www.cornell.edu'
        schoolSeal='./cornell.svg'
        location='Ithaca, New York, United States'
        url='https://infosci.cornell.edu/'
        description='Concentrated on augmented and virtual reality systems to improve medical workflows.'
        startYear='2022'
        endYear='2027'
        courses={[
          { name: 'Quantitative Research Methods', description: 'Covered theoretical and practical aspects of machine learning.', url: 'https://www.cornell.edu/advanced-ml' },
          { name: 'Virtual Reality Systems', description: 'Explored the design and implementation of virtual environments.', url: 'https://www.cornell.edu/vr-systems' }
        ]}
        showCourses={false}
        advisors={[
          { orcid: 'AT', role: 'Advisors' },
          { orcid: '0000-0001-5240-6166', role: 'Advisors' },
          { orcid: '0000-0003-1469-2696', role: 'Advisors' }
        ]}
      />
      <Education
        degree='Study Abroad'
        field=''
        school='University of New South Wales'
        schoolUrl='https://www.unsw.edu.au/'
        schoolSeal='./unsw.svg'
        location='Sydney, New South Wales, Australia'
        url='https://www.unsw.edu.au/'
        description='Focused on developing software solutions for scalable systems.'
        startYear='2020'
        endYear='2020'
        courses={[
          { name: 'Data Structures', description: 'Studied fundamental data structures for computing.', url: 'https://www.iastate.edu/data-structures' },
          { name: 'Introduction to Algorithms', description: 'Introduction to algorithms and their complexity.', url: 'https://www.iastate.edu/algorithms' }
        ]}
        showCourses={false}
        advisors={[]}
      />
      <Education
        degree='BS'
        field='Software Engineering'
        school='Iowa State University'
        schoolUrl='https://www.iastate.edu'
        schoolSeal='./isu.svg'
        location='Ames, Iowa, United States'
        url='https://www.iastate.edu/cs'
        description='Focused on developing software solutions for scalable systems.'
        startYear='2018'
        endYear='2022'
        courses={[
          { name: 'Data Structures', description: 'Studied fundamental data structures for computing.', url: 'https://www.iastate.edu/data-structures' },
          { name: 'Introduction to Algorithms', description: 'Introduction to algorithms and their complexity.', url: 'https://www.iastate.edu/algorithms' }
        ]}
        showCourses={false}
        advisors={[
          { orcid: '0000-0001-6386-4787', role: 'Advisors' },
          { orcid: '0000-0002-5332-029X', role: 'Advisors' }
        ]}
      />
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Research Affiliations</h1>
      <Affiliations
        role='Research Assistant'
        lab='Artificial Intelligence and Robotics Lab'
        labUrl='https://airlab.cis.cornell.edu/'
        lead='AT'
        institution='Cornell Tech'
        institutionUrl='https://tech.cornell.edu/'
        location='New York, New York, United States'
        startDate='2024-01-05'
        endDate='Present'
        description=''
      />
      <Affiliations
        role='Research Assistant'
        lab='Virtual Embodiment Lab'
        labUrl='https://virtualembodimentlab.com/'
        lead='0000-0001-5240-6166'
        institution='Cornell University'
        institutionUrl='https://www.cornell.edu'
        location='Ithaca, New York, United States'
        startDate='2022-08-01'
        endDate='2024-01-05'
        description=''
      />
      <Affiliations
        role='Research Intern'
        lab='Grid Integration Systems and Mobility'
        labUrl='https://gismo.slac.stanford.edu/'
        lead='WH'
        institution='SLAC National Accelerator Laboratory'
        institutionUrl='https://www6.slac.stanford.edu/'
        location='Menlo Park, California, United States'
        startDate='2022-05-01'
        endDate='2022-08-01'
        description=''
      />
      <Affiliations
        role='Undergraduate Research Assistant'
        lab='Virtual Reality Applications Center'
        labUrl='https://www.vrac.iastate.edu/'
        lead='0000-0001-6386-4787'
        institution='Iowa State University'
        institutionUrl='https://www.iastate.edu/'
        location='Ames, Iowa, United States'
        startDate='2020-09-01'
        endDate='2022-05-01'
        description=''
      />
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Teaching</h1>
      <Class
        subject={'INFO'}
        number={'5368'}
        url={'https://classes.cornell.edu/browse/roster/SP25/class/INFO/5368'}
        title={'Practical Applications in Machine Learning'}
        semester={'Spring'}
        year={'2025'}
        instructor={'0000-0001-5693-3326'}
        role={'Teaching Assistant'}
        responsibilities={'This class is for both undergraduate and graduate students at Cornell with different backgrounds. My responsibilities as a TA were to hold office hours and project meetings with students to help them address the problems they encountered during individual assignments and group projects. The problems were usually related to a wide range of topics in rapid prototyping and physical computing including 3D printing, laser cutting, microcontrollers, sensors, and motors. Besides, I also provided grades and feedback on the students’ assignments and project reports together with other TAs.'}
        university={'Cornell University'}
        description={'To date, most computing technologies have primarily benefited urban, affluent, and literate people in developed regions by empowering them with more information, resources, and agency. These technologies currently exclude billions of people worldwide, such as rural residents, people with disabilities, and indigenous communities, who are too poor to afford modern devices, too remote to be connected, or too low-literate to navigate the mostly text-driven Internet. In recent years, researchers and practitioners have examined how computing technologies can be designed or appropriated to empower such underserved communities. This course introduces students to the field of Information and Communication Technologies and Development (ICTD). Through discussions of case studies from the Global South, students will study how computing technologies are used in different global development domains, such as agriculture, finance, health, social justice, and education. They will gain understanding of socio-economic, cultural, and political forces that impact technology adoption in low-resource environments and will learn to design, build, and evaluate inclusive technologies to empower marginalized people.​'}
      />
      <Class
        subject={'INFO'}
        number={'5340'}
        url={'https://classes.cornell.edu/browse/roster/SP24/class/INFO/4505'}
        title={'Virtual and Augmented Reality'}
        semester={'Fall'}
        year={'2024'}
        instructor={'0000-0001-5693-3326'}
        role={'Teaching Assistant'}
        responsibilities={'This class is for both undergraduate and graduate students at Cornell with different backgrounds. My responsibilities as a TA were to hold office hours and project meetings with students to help them address the problems they encountered during individual assignments and group projects. The problems were usually related to a wide range of topics in rapid prototyping and physical computing including 3D printing, laser cutting, microcontrollers, sensors, and motors. Besides, I also provided grades and feedback on the students’ assignments and project reports together with other TAs.'}
        university={'Cornell University'}
        description={'To date, most computing technologies have primarily benefited urban, affluent, and literate people in developed regions by empowering them with more information, resources, and agency. These technologies currently exclude billions of people worldwide, such as rural residents, people with disabilities, and indigenous communities, who are too poor to afford modern devices, too remote to be connected, or too low-literate to navigate the mostly text-driven Internet. In recent years, researchers and practitioners have examined how computing technologies can be designed or appropriated to empower such underserved communities. This course introduces students to the field of Information and Communication Technologies and Development (ICTD). Through discussions of case studies from the Global South, students will study how computing technologies are used in different global development domains, such as agriculture, finance, health, social justice, and education. They will gain understanding of socio-economic, cultural, and political forces that impact technology adoption in low-resource environments and will learn to design, build, and evaluate inclusive technologies to empower marginalized people.​'}
      />
      <Class
        subject={'INFO'}
        number={'4505/5505'}
        url={'https://classes.cornell.edu/browse/roster/SP24/class/INFO/4505'}
        title={'Computing and Global Development'}
        semester={'Spring'}
        year={'2024'}
        instructor={'0000-0001-5693-3326'}
        role={'Teaching Assistant'}
        responsibilities={'This class is for both undergraduate and graduate students at Cornell with different backgrounds. My responsibilities as a TA were to hold office hours and project meetings with students to help them address the problems they encountered during individual assignments and group projects. The problems were usually related to a wide range of topics in rapid prototyping and physical computing including 3D printing, laser cutting, microcontrollers, sensors, and motors. Besides, I also provided grades and feedback on the students’ assignments and project reports together with other TAs.'}
        university={'Cornell University'}
        description={'To date, most computing technologies have primarily benefited urban, affluent, and literate people in developed regions by empowering them with more information, resources, and agency. These technologies currently exclude billions of people worldwide, such as rural residents, people with disabilities, and indigenous communities, who are too poor to afford modern devices, too remote to be connected, or too low-literate to navigate the mostly text-driven Internet. In recent years, researchers and practitioners have examined how computing technologies can be designed or appropriated to empower such underserved communities. This course introduces students to the field of Information and Communication Technologies and Development (ICTD). Through discussions of case studies from the Global South, students will study how computing technologies are used in different global development domains, such as agriculture, finance, health, social justice, and education. They will gain understanding of socio-economic, cultural, and political forces that impact technology adoption in low-resource environments and will learn to design, build, and evaluate inclusive technologies to empower marginalized people.​'}
      />
      <Class
        subject={'COMM'}
        number={'1101'}
        url={'https://sce.cornell.edu/courses/roster/comm-1101'}
        title={'Introduction to Communication'}
        semester={'Fall'}
        year={'2023'}
        instructor={'0000-0003-0257-6217'}
        role={'Guest Lecturer'}
        responsibilities={''}
        university={'Cornell University'}
        description={'​'}
      />
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Posters and Demos</h1>
      <Publication
        author={[
          '0000-0002-8506-3785',
          '0009-0006-5594-1635',
          'JN',
          'FO',
          'AT'
        ]}
        cofirst={false}
        year='2024'
        title='AR application design for Healthcare Teams'
        conference='XR Access'
        address='New York, NY, USA'
        date='May 11--16, 2024'
        doi='/posters/arhealth24.pdf'
      />
      <Publication
        author={[
          '0000-0002-8506-3785',
          '0000-0003-2501-0304',
          '0009-0002-6167-6955',
          '0009-0002-7266-9785',
          '0000-0003-4434-1723',
          '0000-0001-5240-6166'
        ]}
        cofirst={false}
        year='2023'
        title='Guide to Distributing Tools for VR Accessibility Accommodations'
        booktitle='Proceedings of the ACM Conference on Human Factors in Computing Systems'
        conference='XR Access'
        address='Honolulu, HI, USA'
        date='May 11--16, 2024'
        doi='https://xraccess.org/guide-to-distributing-tools-for-vr-accessibility-accommodations/'
      />
      <Publication
        author={[
          '0000-0002-8506-3785',
          '0000-0003-1606-874X',
          '0000-0001-8465-6442',
          '0000-0003-3229-4341',
          'MJ',
          'SF',
          '0000-0001-5240-6166'
        ]}
        cofirst={false}
        year='2022'
        title='Improving collaboration in remote teams through tools to promote mutual understanding of nonverbal behavior'
        booktitle='Cornell XR Retreat'
        conference='XR Retreat'
        address='New York, New York, United States'
        date='October 14, 2022'
        doi='/posters/nonverbal22.pdf'
      />
      <Publication
        author={[
          '0000-0003-1606-874X',
          '0000-0001-8465-6442',
          '0000-0002-8506-3785',
          '0000-0003-3229-4341',
          '0000-0002-0880-077X',
          'SF',
          '0000-0001-5240-6166'
        ]}
        cofirst={false}
        year='2022'
        title='A Training Tool to Help Teachers Recognize and Reduce Bias in Their Classroom Behaviors and Increase Interpersonal Competence'
        booktitle='Cornell XR Retreat'
        conference='XR Retreat'
        address='New York, New York, United States'
        date='October 14, 2022'
        doi='/posters/teaching22.pdf'
      />
      <Publication
        author={[
          '0000-0002-8506-3785',
          'WH',
          '0000-0002-3714-7239',
          '0000-0002-7007-6305'
        ]}
        cofirst={false}
        year='2022'
        title='Multi-Scale Cognitive Simulation can Enhance the Efficiency of LCLS Experimental Operations'
        booktitle='LCLS Summer Student Posters Session'
        conference='LCLS'
        address='Palo Alto, CA, USA'
        date='May 11--16, 2024'
        doi='/posters/lcls22.pdf'
      />
      <Publication
        author={[
          '0000-0002-8506-3785',
          'JR',
          'RF',
          'YF',
          '0000-0001-6386-4787',
          '0000-0002-5332-029X'
        ]}
        cofirst={false}
        year='2022'
        title='MazeWorld: A Game-Based Environment developed to Assess Teaming Behaviors'
        booktitle='Iowa State Undergraduate Research Symposium'
        conference='ISU URS'
        address='Ames, IA, USA'
        date='April 29, 2022'
        doi=''
      />
      <Publication
        author={[
          'JR',
          'EC',
          '0000-0002-8506-3785',
          '0000-0001-6386-4787',
          '0000-0002-5332-029X'
        ]}
        cofirst={false}
        year='2021'
        title='Human-Agent Teams and MazeWorld'
        booktitle='Iowa State Undergraduate Research Symposium'
        conference='ISU URS'
        address='Ames, IA, USA'
        date='April 22, 2021'
        doi='/posters/mazeworld21.pdf'
      />
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Service</h1>
      <Service
        role='Student Volunteer'
        organization='AWE XR'
        organizationShortName='AWE'
        organizationUrl='https://www.awexr.com/'
        startDate='2025-06-18'
        endDate='2025-06-20'
        description=''
      />
      <Service
        role='Student Volunteer'
        organization='SigGraph'
        organizationShortName='SigGraph'
        organizationUrl='https://s2024.siggraph.org/'
        startDate='2024-07-28'
        endDate='2024-08-01'
        description=''
      />
      <Service
        role='Student Volunteer'
        organization='AWE XR'
        organizationShortName='AWE'
        organizationUrl='https://www.awexr.com/'
        startDate='2024-06-18'
        endDate='2024-06-20'
        description=''
      />
      <Service
        role='IT Chair'
        organization='XR Access'
        organizationShortName='XR Access'
        organizationUrl='https://xraccess.org/symposium/'
        startDate='2024-06-06'
        endDate='2024-06-07'
        description=''
      />
      <Service
        role='Treasurer'
        organization='Information Science Graduate Student Association'
        organizationShortName='ISGSA'
        organizationUrl='https://infosci.cornell.edu'
        startDate='2022-08-01'
        endDate='Present'
        description='Responsible for managing the budget and finances of the organization.'
      />
      <Service
        role='Reviewer'
        organization='Association for Computing Machinery International Conference on Computer-Human Interaction'
        organizationShortName='IS Student-Applicant Reading Program (SARP)'
        organizationUrl='https://infosci.cornell.edu'
        startDate='2024-01-01'
        endDate='2024-01-01'
        description='Responsible for managing the budget and finances of the organization.'
      />
      <Service
        role='Reviewer'
        organization='Association for Computing Machinery/Institute of Electrical and Electronics Engineers International Conference on Human-Robot Interaction'
        organizationShortName='ACM HRI'
        organizationUrl='https://infosci.cornell.edu'
        startDate='2024-01-01'
        endDate='2024-01-01'
        description='Responsible for managing the budget and finances of the organization.'
      />
      <Service
        role='Reviewer'
        organization='Association for Computing Machinery International Conference on Computer-Human Interaction'
        organizationShortName='ACM CHI'
        organizationUrl='https://infosci.cornell.edu'
        startDate='2024-01-01'
        endDate='2024-01-01'
        description='Responsible for managing the budget and finances of the organization.'
      />
      <Service
        role='Organizing Committee'
        organization='Association for Computing Machinery International Conference on Computer-Human Interaction'
        organizationShortName='Information Science Research Retreat'
        organizationUrl='https://infosci.cornell.edu'
        startDate='2023-05-02'
        endDate='2023-05-02'
        description='Responsible for managing the budget and finances of the organization.'
      />
      <Service
        role='Judge'
        organization='Association for Computing Machinery International Conference on Computer-Human Interaction'
        organizationShortName='State Science Technology Fair of Iowa'
        organizationUrl='https://infosci.cornell.edu'
        startDate='2022-03-24'
        endDate='2022-03-24'
        description='Responsible for managing the budget and finances of the organization.'
      />
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Talks and Tutorials</h1>
      <Talk
        title='Live VR scanning'
        venue='Neurosalon: Life History Lab'
        link={'#'}
      />
      <Talk
        title='XR Live Scanning'
        venue='Life History Lab'
        link={'https://docs.google.com/presentation/d/118iCvG6_Ov8gMeLBsNa3pncNXNx0itpQXlFC8_FGZYQ/edit?usp=sharing'}
      />
      <p>Unity Teaching</p>
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Grants</h1>
      <p>CIS Dream Grant</p>
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Industry</h1>
      <Experience
        title='Research Intern'
        company='SLAC National Accelerator Laboratory'
        companyUrl='https://www6.slac.stanford.edu'
        location='Menlo Park, California, United States'
        startDate='2022-05-01'
        endDate='2022-08-01'
        description='Mentored by Jeffrey Shrager, Frank Ritter, and Wan-Lin Hu. Observed teams running the LCLS to understand and build a cognitive behavior model. Generated novel statistics on the efficiency of the current workflow by running simulations given sets of workflow parameters.'
      />
      <Experience
        title='Software Engineer Intern'
        company='BlackRock'
        companyUrl='https://www.blackrock.com'
        location='New York, New York, United States'
        startDate='2021-05-01'
        endDate='2021-08-01'
        description='Developed new in-house analytics dashboard using Angular and Java Spring Boot to add no-code access to product metrics. Coordinated with product managers and stakeholders to provide analytics from various Aladdin products with real time updates.'
      />
      <Experience
        title='Software Engineer Intern'
        company='Dwolla'
        companyUrl='https://www.dwolla.com'
        location='Des Moines, Iowa, United States'
        startDate='2020-05-01'
        endDate='2020-08-01'
        description='Developed enhancements for the in-house C# ASP.NET admin system which improved readability by implementing ADA AA standards and surfacing important hidden information. Removed users access to out of contract services by adding logic using Scala that checks the type of user contract and sends error codes when there is an unauthorized call to the API. Increased CSRF coverage of the in-house admin application by 80% by developing tests that verify the presence of CSRF Tokens and Verification Headers'
      />
      <Experience
        title='Software Engineer Intern'
        company='Corteva Agriscience'
        companyUrl='https://www.corteva.com'
        location='Johnston, Iowa, United States'
        startDate='2019-05-01'
        endDate='2019-08-01'
        description='I developed an improved system for managing the information gathered from the genetics laboratory on a Scrum team. Researched how the technicians were using the existing system and how the new system should improve the process. I built out the solution using Typescript in Angular for the UI, C# with .NET core for back-end, SQL with Entity Framework, and hosted the platform on Azure.'
      />
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Organizations</h1>
      <p>ACM SIGCHI</p>
      <p>IEEE VR</p>
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Leadership</h1>
      <p>Hackathon Club</p>
      <p>Photo Club</p>
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Software Artifacts and Datasets</h1>
      <p>Social Sensory Sub</p>
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Personal Projects</h1>
      <Project
        title='Vital AR'
        event='Cornell Health Hackathon'
        description=''
        url=''
      />
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Mentoring</h1>
      <p>Veritas AI</p>
      <hr className='my-6 border-neutral-100 dark:border-neutral-800' />
      <h1 className='font-medium text-2xl mb-6 tracking-tighter'>Professional Certifications</h1>
      <p>EMT</p>
    </section >
  );
}
