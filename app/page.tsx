import Link from 'next/link';
import Image from 'next/image';
import medical from 'public/images/medical.jpg';
import presentation from 'public/images/presentation.jpg';
import cohort from 'public/images/cohort.jpg';
import lab from 'public/images/lab.jpg';
import nyc from 'public/images/nyc.jpg';
import ithaca from 'public/images/ithaca.jpg';

function ArrowIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor">
            <path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" />
        </svg>
    );
}

const SocialLink = ({ name, url }) => (
    <li className="mb-2 mr-2">
        <Link href={url}>
            <span className="link inline-block py-1 px-3 rounded-md transition duration-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">{name}</span>
        </Link>
    </li>
);
const GridImage = ({ alt, src, classNames, sizes }) => (
    <div className={classNames}>
        <Image
            alt={alt}
            src={src}
            fill
            sizes={sizes}
            className='rounded-lg object-cover'
        />
    </div>
);

export default function Page() {
    const socialLinks = [
        { name: 'Github', url: 'https://github.com/Jonathannsegal' },
        { name: 'Twitter', url: 'https://twitter.com/jonathannsegal' },
        { name: 'Linkedin', url: 'https://www.linkedin.com/in/jonathannsegal/' },
        { name: 'Orcid', url: 'https://orcid.org/0000-0002-8506-3785' },
        { name: 'Scholar', url: 'https://scholar.google.com/citations?user=Wr3zbI8AAAAJ&hl=en' },
        { name: 'Academic Tree', url: 'https://academictree.org/infoscience/peopleinfo.php?pid=933704' },
        { name: 'Instagram', url: 'https://www.instagram.com/jonathannsegal/' },
    ];
    const gridImages = [
        { alt: 'Me with a group of fellow PhD students at a Cornell mens hockey game, Go Big Red!', src: lab, classNames: 'relative mb-4 h-40', sizes: '(max-width: 768px) 213px, 33vw' },
        { alt: 'A photo of the Cornell Tech campus in New York City, looking down the main throughway with the Queensborough bridge in the background', src: nyc, classNames: 'relative mb-4 h-80 sm:mb-0', sizes: '(max-width: 768px) 213px, 33vw' },
        { alt: 'Me presenting my project at the Cornell health hackathon 2024', src: presentation, classNames: 'relative h-40 sm:mb-4 sm:h-80', sizes: '(max-width: 768px) 213px, 33vw' },
        { alt: 'Me, my housemates, and Touchdown the cornell mascot at a football game', src: medical, classNames: 'relative mb-4 h-40 sm:mb-0', sizes: '(max-width: 768px) 213px, 33vw' },
        { alt: 'Me with a group of fellow PhD students at the regent lounge at the Statler hotel', src: cohort, classNames: 'relative mb-4 h-40', sizes: '(max-width: 768px) 213px, 33vw' },
        { alt: 'An aerial photo of the Cornell Ithaca campus in Ithaca, looking down on gates hall with mcgraw tower and cayuga lake in the distance', src: ithaca, classNames: 'relative h-80', sizes: '(min-width: 768px) 213px, 33vw' },
    ];

    return (
        <section>
            <h1 className='font-bold text-2xl mb-8 tracking-tighter'>hi, I'm jonathan segal</h1>
            <p className='prose prose-neutral dark:prose-invert'>
                {`I'm currently working on my Ph.D. in Information Science at `}
                <Link href='https://infosci.cornell.edu/content/segal'>Cornell University</Link>
                {` and am a member of `}
                <Link href='https://airlab.cis.cornell.edu/'>AIRLab</Link>
                {` led by `}
                <Link href='https://tech.cornell.edu/people/angelique-taylor/'>Dr. Angelique Taylor</Link>
                {`. I am motivated by a future where augmented reality transforms healthcare delivery, particularly by assisting `}
                <Link href='https://www.health.ny.gov/professionals/ems/'>EMS</Link>
                {` and other medical professionals in high-stakes situations. Additionally, I am excited about many topics, such as `}
                <Link href='https://www.linkedin.com/posts/jonathannsegal_internship-sanfrancisco-slacnationalacceleratorlaboratory-activity-6967628873400299520-J-0m/?utm_source=share&utm_medium=member_desktop'>particle physics</Link>
                {`, `}
                <Link href='/papers/DefenseNetworks.pdf'>sports analytics</Link>
                {`, `}
                <Link href='https://sdmay22-35.sd.ece.iastate.edu/'>geospatial data</Link>
                {`, generative AI, and `}
                <Link href='https://medium.com/@jonathannsegal/my-startup-in-college-failed-heres-what-i-learned-96fae77921a1'>startups</Link>
                {`.`}
            </p>
            <div className='my-8 columns-2 gap-4 sm:columns-3'>
                {gridImages.map((image, index) => (
                    <GridImage key={index} {...image} />
                ))}
            </div>
            <p className='prose prose-neutral dark:prose-invert'>
                {`Previously, I earned a Bachelor's degree in Software Engineering at `}
                <Link href='https://www.iastate.edu/'>Iowa State</Link>
                {`, where I worked with `}
                <Link href='https://www.engineering.iastate.edu/people/profile/gilbert/'>Dr. Stephen Gilbert</Link>
                {` and `}
                <Link href='https://www.imse.iastate.edu/dorneich/'>Dr. Michael Dorneich</Link>
                {` at `}
                <Link href='https://www.vrac.iastate.edu/'>VRAC</Link>
                {`. I spent a summer at `}
                <Link href='https://www6.slac.stanford.edu/'>SLAC</Link>
                {` working with `}
                <Link href='https://sites.google.com/view/jeffshrager-org/home'>Dr. Jeff Shrager</Link>
                {` and `}
                <Link href='https://profiles.stanford.edu/wan-lin-hu'>Wan-Lin Hu</Link>
                {` . During my summers I've interned at `}
                <Link href='https://www.blackrock.com/'>BlackRock</Link>
                {`, `}
                <Link href='https://web.archive.org/web/20230320190202/https://www.dwolla.com/updates/my-crazy-summer-internship/?utm_campaign=Ongoing-Social&utm_content=136222797&utm_medium=social&utm_source=twitter&hss_channel=tw-84909450'>Dwolla</Link>
                {`, and `}
                <Link href='https://www.corteva.com/'>Corteva</Link>
                {`.`}
            </p>
            <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
                <li>
                    <a
                        className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://calendar.app.google/rQoseKnSSMrb1iPL9"
                    >
                        <ArrowIcon />
                        <p className="ml-2 h-7">setup a time to chat</p>
                    </a>
                </li>
                <li>
                    <a
                        className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
                        rel="noopener noreferrer"
                        target="_blank"
                        href="mailto:jis62@cornell.edu"
                    >
                        <ArrowIcon />
                        <p className="ml-2 h-7">email me</p>
                    </a>
                </li>
            </ul>
            <ul className="mt-4 flex flex-wrap">
                {socialLinks.map((link, index) => (
                    <SocialLink key={index} {...link} />
                ))}
            </ul>
        </section >
    );
}
