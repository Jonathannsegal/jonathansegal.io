import Link from 'next/link';
import Image from 'next/image';
import friends from 'public/images/friends.jpg';
import presentation from 'public/images/presentation.jpg';
import cohort from 'public/images/cohort.jpg';
import hockey from 'public/images/hockey.jpg';
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

function GithubIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 98 96"
            fill="currentColor">
            <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
        </svg>
    );
}

function LinkedinIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 72 72"
            fill="currentColor">
            <path d="M64 0H8C3.58 0 0 3.58 0 8v56c0 4.42 3.58 8 8 8h56c4.42 0 8-3.58 8-8V8c0-4.42-3.58-8-8-8ZM21.77 62H11.03V27.33h10.74V62Zm-5.42-39.21c-3.51 0-6.35-2.86-6.35-6.4s2.84-6.4 6.35-6.4 6.35 2.86 6.35 6.4-2.84 6.4-6.35 6.4ZM62 62H51.32V43.8c0-4.99-1.9-7.78-5.84-7.78-4.3 0-6.54 2.9-6.54 7.78V62h-10.3V27.33h10.3V32s3.1-5.73 10.45-5.73 12.62 4.49 12.62 13.78V62Z" />
        </svg>
    );
}

function OrcidIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 256 256"
            fill="currentColor" >
            <path d="M148 93h-23.7v79.4h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 111.2 178 93 148 93Z" />
            <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0ZM86.3 127.5v58.7H70.9V79.1h15.4v48.4Zm-7.7-60.6c-5.6 0-10.1-4.6-10.1-10.1S73 46.7 78.6 46.7s10.1 4.6 10.1 10.1-4.5 10.1-10.1 10.1Zm72.1 119.4h-41.8V79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6Z" />
        </svg >
    );
}

function TwitterIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 1200 1227"
            fill="currentColor" >
            <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" />
        </svg>
    );
}

function GoogleScholarIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 512 512"
            fill="currentColor">
            <circle cx="256" cy="362.67" r="149.33" opacity=".3" />
            <path d="M391.82 300.52 512 202.66 256 0v213.33c60.3 0 112.24 35.74 135.82 87.19Z" />
            <path d="M256 213.33V0L0 202.67l120.18 97.86c23.58-51.45 75.52-87.19 135.82-87.19Z" opacity=".8" />
            <path d="M121.04 298.67c23.97-50.45 75.39-85.33 134.96-85.33s110.99 34.88 134.96 85.33H121.04Z" opacity=".5" />
        </svg>
    );
}

function AcademicTreeIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 50 34.37"
            fill="currentColor">
            <path d="M26.01 7.55c.93-1.16 1.37-2.04 1.33-2.64-.4 1.09-1.04 1.96-1.94 2.61-.96-2.04-.12-3.76 2.52-5.17.85 3.17.21 4.9-1.91 5.19ZM6.56 12.23c-1.24-1.31-2.21-1.99-2.93-2.04 1.24.66 2.17 1.58 2.8 2.77-2.61.81-4.53-.49-5.76-3.89 3.94-.48 5.91.58 5.9 3.17ZM13.09 7.79c-1.27-1.35-2.28-2.05-3.02-2.1 1.27.68 2.23 1.63 2.88 2.85-2.69.83-4.66-.5-5.93-4.01 4.05-.49 6.07.6 6.07 3.26ZM12.67 11.94c1.65.97 2.62 2.06 2.92 3.27-3.27.63-5.79-1.05-7.57-5.04 5.42-.52 8.09.98 8 4.49-1.15-1.53-2.26-2.44-3.35-2.72ZM19.58 22.64c-1.26-.15-2.05-.41-2.38-.8.89.42 1.8.56 2.73.42-.64-1.81-2.18-2.35-4.61-1.61 1.38 2.42 2.8 3.08 4.26 1.99ZM45.07 19.7c1.67.81 2.64 1.56 2.91 2.24-1.03-1.01-2.22-1.64-3.58-1.89.01 2.81 1.88 4.29 5.6 4.45-.75-4.01-2.39-5.61-4.93-4.81ZM36.93 13.64c.78-2.19 1.58-3.49 2.4-3.92-1.12 1.42-1.75 2.99-1.87 4.71 3.5-.39 5.09-2.92 4.79-7.57-4.89 1.47-6.67 3.73-5.32 6.78ZM16.34 3.28c.89 1.23 1.25 2.33 1.07 3.3-2.57-.59-3.87-2.61-3.88-6.07 4.1 1.35 5.56 3.29 4.37 5.81-.34-1.48-.86-2.49-1.56-3.04ZM21.84 3.43a7.7 7.7 0 0 0-.59 4.73C19.42 5 19.71 2.28 22.12 0c2.3 2.18 2.44 5.81.32 8.16a7.159 7.159 0 0 1-.59-4.73ZM29.56 9.08c.78-2.19 1.58-3.49 2.4-3.92-1.12 1.42-1.75 2.99-1.87 4.71 3.5-.39 5.09-2.92 4.79-7.57-4.89 1.47-6.67 3.73-5.32 6.78ZM21.93 18.03c-.51.42-.92.96-1.2 1.56-.35-2.49.73-4.08 3.23-4.75.65 2.06-.24 4.3-2.13 5.36-.34-.69-.3-1.51.1-2.17ZM34.14 17.89c.73-1.03 1.35-1.6 1.84-1.7-.8.58-1.36 1.31-1.68 2.19 1.89.31 3.1-.78 3.63-3.26-2.79.05-4.05.97-3.8 2.77Z" />
            <path d="M1.41 20.37c.78.67 1.79 1.03 2.82.99 1.42.13 2.38.61 2.89 1.43-1.89.77-3.29 1.47-4.2 2.09.46-.66 1.34-1.33 2.67-2.02l.29-.15c-.77-.1-1.54 0-2.24.26l-.11.03c-.88.37-1.65.98-2.18 1.8l-.04.02c-.34.64-.55 1.41-.62 2.33 3.6.17 5.54-1.04 5.83-3.63 4.05-.21 7.35.46 9.89 2.01 3.4 2.6 4.51 5.54 3.35 8.82h6.53a9.563 9.563 0 0 1-.63-3.51c.5-4.72 4.67-8.17 9.4-7.78-.02.65.26 1.27.76 1.68.5.41 1.17.55 1.8.39a3.4 3.4 0 0 0-1.5-2.64c2.48-.01 4.19.43 5.1 1.34-.8-.34-1.62-.63-2.46-.87-.05 2.44 1.89 3.85 5.81 4.22-.49-2.87-1.74-4.43-3.74-4.67l-2.82-.63c1.9-1.65 4.31-2.26 7.23-1.83-.7-.56-2.67-.74-5.93-.51.09-.21.16-.42.22-.65 3.35.44 5.6-.96 6.72-4.22-4.56-.81-6.97.19-7.21 2.98 1.59-1.27 3.02-1.97 4.3-2.09-2.09.84-3.43 1.65-4.02 2.42-.49 1.09-1.15 1.92-1.97 2.5-1.42 1.14-2.84 1.4-4.28.77a3.13 3.13 0 0 0 3.11-1.66c-.59-.44-1.35-.57-2.05-.34-.7.23-1.23.79-1.44 1.5 0 0-1.81.95-5.44 2.84.29-1.8 1.37-3.03 3.25-3.7 1.76-.13 2.85-.63 3.27-1.5-.41.17-1.44.23-3.09.18.12-.72.29-1.25.53-1.62.45.23.98.26 1.46.09s.87-.52 1.08-.98c-.63-.63-1.48-.54-2.54.26-.14-1.95.22-3.28 1.06-4-.59.81-.74 1.88-.43 3.19 2.06-.59 2.99-2.88 2.8-6.86-3.14 1.33-4.53 3.32-4.18 5.97.07 2.04-.87 3.51-2.8 4.41 0 0-.51-1.31-1.54-3.92 1.53-.92 2.22-2.18 2.07-3.78.25.39.36.9.34 1.54.49-.75.67-1.66.49-2.54-.18-.88-.7-1.64-1.45-2.13-1.12 1.7-1.28 3.37-.47 5.03-.23.23-.72.53-1.48.91l-.03-.04-.02.04a8.563 8.563 0 0 0-2.53-4.05h-.02c-.08-.09-.16-.16-.25-.23-.2-.16-.41-.32-.63-.46-.3-.2-.61-.38-.94-.54h-.01l-.06-.03c-1.8-.87-3.95-1.11-6.44-.73 2.22 4.54 5.24 6.48 9.06 5.83-.44-1.59-1.69-2.92-3.74-3.98 3.84 1.27 5.68 4.33 5.52 9.18-.23 2.11-1.13 4.25-2.7 6.43-.39-.41-.7-1.31-.96-2.7-.18-2.09-1.33-3.61-3.45-4.57-2.73-2.33-5.24-2.44-7.53-.34 2.74 2.28 5.21 2.54 7.41.8a4.13 4.13 0 0 1 1.29 1.72c.29.67.48 1.38.58 2.11-.11.83-.15 1.58-.12 2.27-1.42-.92-3.77-1.72-7.03-2.42-1.07-2.42-2.4-4.04-3.99-4.84l-.54-.24-.18-.06h.02c-.81-.31-1.65-.52-2.51-.61 1.39-.1 2.78.25 3.95 1.01-.42-2.58-2.73-3.37-6.94-2.36 1.65 3.28 3.87 4.34 6.66 3.19 1.02 1.54 1.51 2.85 1.46 3.94-1.43.34-3.02-.15-4.77-1.46-.21-1.4-1-2.64-2.18-3.42a4.917 4.917 0 0 0-4-.64c-.1 1.14.28 2.27 1.06 3.11.11.12.22.22.34.32Z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 96 96"
            fill="currentColor">
            <path d="M48 0C34.97 0 33.33.06 28.21.29c-5.11.23-8.6 1.04-11.65 2.23-3.16 1.23-5.83 2.87-8.5 5.53-2.67 2.67-4.31 5.35-5.54 8.5C1.33 19.6.52 23.09.29 28.2.06 33.32 0 34.96 0 47.99s.06 14.67.29 19.79c.24 5.11 1.04 8.6 2.23 11.65 1.23 3.16 2.87 5.83 5.54 8.5s5.34 4.31 8.5 5.54c3.05 1.19 6.54 2 11.65 2.23 5.12.23 6.76.29 19.79.29s14.67-.06 19.79-.29c5.11-.23 8.6-1.04 11.66-2.23 3.16-1.23 5.83-2.87 8.5-5.54s4.31-5.35 5.54-8.5c1.18-3.05 1.99-6.54 2.23-11.65.23-5.12.29-6.75.29-19.79s-.06-14.67-.29-19.79c-.24-5.11-1.05-8.6-2.23-11.65-1.23-3.16-2.87-5.83-5.54-8.5s-5.34-4.31-8.5-5.53C76.39 1.33 72.9.52 67.79.29 62.67.06 61.04 0 48 0h.01Zm-4.3 8.65h4.31c12.82 0 14.33.05 19.4.28 4.68.21 7.22 1 8.91 1.65 2.24.87 3.84 1.91 5.52 3.59 1.68 1.68 2.72 3.28 3.59 5.52.66 1.69 1.44 4.23 1.65 8.91.23 5.06.28 6.58.28 19.39s-.05 14.33-.28 19.39c-.21 4.68-1 7.22-1.65 8.91-.87 2.24-1.91 3.83-3.59 5.51-1.68 1.68-3.28 2.72-5.52 3.59-1.69.66-4.23 1.44-8.91 1.65-5.06.23-6.58.28-19.4.28s-14.34-.05-19.4-.28c-4.68-.22-7.22-1-8.91-1.65-2.24-.87-3.84-1.91-5.52-3.59-1.68-1.68-2.72-3.28-3.59-5.52-.66-1.69-1.44-4.23-1.65-8.91-.23-5.06-.28-6.58-.28-19.4s.05-14.33.28-19.39c.21-4.68 1-7.22 1.65-8.91.87-2.24 1.91-3.84 3.59-5.52 1.68-1.68 3.28-2.72 5.52-3.59 1.69-.66 4.23-1.44 8.91-1.66 4.43-.2 6.14-.26 15.09-.27Zm29.93 7.97c-3.18 0-5.76 2.58-5.76 5.76s2.58 5.76 5.76 5.76 5.76-2.58 5.76-5.76-2.58-5.76-5.76-5.76ZM48 23.35c-13.61 0-24.65 11.04-24.65 24.65S34.39 72.65 48 72.65 72.65 61.62 72.65 48 61.62 23.35 48 23.35ZM48 32c8.84 0 16 7.16 16 16s-7.16 16-16 16-16-7.16-16-16 7.16-16 16-16Z" />
        </svg>
    );
}

export default function Page() {
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
                <div className='relative mb-4 h-40'>
                    <Image
                        alt='Me speaking on stage at React Summit about the future of Next.js'
                        src={hockey}
                        fill
                        sizes='(max-width: 768px) 213px, 33vw'
                        priority
                        className='rounded-lg object-cover'
                    />
                </div>
                <div className='relative mb-4 h-80 sm:mb-0'>
                    <Image
                        alt='Me, Lydia, and Delba filming the Next.js Conf keynote'
                        src={nyc}
                        fill
                        sizes='(max-width: 768px) 213px, 33vw'
                        priority
                        className='rounded-lg object-cover object-[-16px] sm:object-center'
                    />
                </div>
                <div className='relative h-40 sm:mb-4 sm:h-80'>
                    <Image
                        alt='Me standing on stage at Reactathon delivering the keynote'
                        src={presentation}
                        fill
                        sizes='(max-width: 768px) 213px, 33vw'
                        priority
                        className='rounded-lg object-cover object-top sm:object-center'
                    />
                </div>
                <div className='relative mb-4 h-40 sm:mb-0'>
                    <Image
                        alt='Me standing on stage at SmashingConf giving a talk about my optimism for the web'
                        src={friends}
                        fill
                        sizes='(max-width: 768px) 213px, 33vw'
                        priority
                        className='rounded-lg object-cover'
                    />
                </div>
                <div className='relative mb-4 h-40'>
                    <Image
                        alt='Me and Guillermo Rauch on stage for Vercel Ship, answering questions from the Next.js community'
                        src={cohort}
                        fill
                        sizes='(max-width: 768px) 213px, 33vw'
                        priority
                        className='rounded-lg object-cover'
                    />
                </div>
                <div className='relative h-80'>
                    <Image
                        alt='My badge on top of a pile of badges from a Vercel meetup we held'
                        src={ithaca}
                        fill
                        sizes='(min-width: 768px) 213px, 33vw'
                        priority
                        className='rounded-lg object-cover'
                    />
                </div>
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
            <ul className="mt-4 flex flex-row space-x-2 space-y-0 text-neutral-600 dark:text-neutral-300">
                <li>
                    <Link href={"https://github.com/Jonathannsegal"}>
                        <GithubIcon />
                    </Link>
                </li>
                <li>
                    <Link href={"https://twitter.com/jonathannsegal"}>
                        <TwitterIcon />
                    </Link>
                </li>
                <li>
                    <Link href={"https://www.linkedin.com/in/jonathannsegal/"}>
                        <LinkedinIcon />
                    </Link>
                </li>
                <li>
                    <Link href={"https://orcid.org/0000-0002-8506-3785"}>
                        <OrcidIcon />
                    </Link>
                </li>
                <li>
                    <Link href={"https://scholar.google.com/citations?user=Wr3zbI8AAAAJ&hl=en"}>
                        <GoogleScholarIcon />
                    </Link>
                </li>
                <li>
                    <Link href={"https://academictree.org/infoscience/peopleinfo.php?pid=933704"}>
                        <AcademicTreeIcon />
                    </Link>
                </li>
                <li>
                    <Link href={"https://www.instagram.com/jonathannsegal/"}>
                        <InstagramIcon />
                    </Link>
                </li>
            </ul>
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
        </section >
    );
}
