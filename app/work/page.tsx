// app/work/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import { differenceInMonths, format, parseISO } from 'date-fns';

export const metadata: Metadata = {
  title: 'Work',
  description: 'A summary of my work and contributions.',
};

/* ---------- Small utilities ---------- */
type Person = {
  firstName: string;
  middleName?: string;
  lastName: string;
  orcid: string;
  url?: string;
};

type People = Person[];

/* ---------- Presentational components (now take `people` as a prop) ---------- */

function Publication({
  people,
  author,
  cofirst,
  year,
  title,
  booktitle = '',
  conference,
  date,
  address,
  doi,
}: {
  people: People;
  author: string[];
  cofirst: string[] | false;
  year: string;
  title: string;
  booktitle?: string;
  conference?: string;
  date?: string;
  address?: string;
  doi?: string;
}) {
  const authorLinks = author.map((orcid) => {
    const foundAuthor = people.find((a) => a.orcid === orcid);
    const isCoFirst = cofirst !== false && Array.isArray(cofirst) && cofirst.includes(orcid);
    if (foundAuthor) {
      return {
        name: `${foundAuthor.lastName}, ${foundAuthor.firstName?.charAt(0) || ''}.`,
        url: foundAuthor.url || '#',
        isInternal: foundAuthor.orcid === '0000-0002-8506-3785',
        isCoFirst,
      };
    }
    return { name: 'Unknown Author', url: '#', isInternal: false, isCoFirst };
  });

  const formattedAuthors = authorLinks.map((a, idx) => (
    <span key={idx} className="mr-1">
      <Link
        href={a.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${a.isInternal ? 'font-bold' : ''} hover:underline underline-offset-2 decoration-[0.1em] transition duration-300 ease-in-out dark:text-white`}
      >
        {a.name}
        {a.isCoFirst ? '*' : ''}
      </Link>
      {idx < authorLinks.length - 1 ? ', ' : ''}
    </span>
  ));

  return (
    <div className="mb-4">
      <span className="text-sm text-gray-700 dark:text-gray-300">{formattedAuthors}</span>
      <span className="text-sm text-gray-800 dark:text-gray-200">
        <Link
          href={doi || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="italic text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500"
        >
          {title}.
        </Link>
        {conference ? <span> {conference}, </span> : null}
        <span>{year}. </span>
      </span>
      {cofirst !== false && (
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">* Authors contributed to this work equally</div>
      )}
    </div>
  );
}

function Class({
  people,
  subject,
  number,
  url,
  title,
  semester,
  year,
  instructor,
  role,
  university,
}: any) {
  const instructorInfo = people.find((p) => p.orcid === instructor);
  const instructorName = instructorInfo ? (
    <Link
      href={instructorInfo.url || '#'}
      className="hover:underline underline-offset-2 decoration-[0.1em] transition duration-300 ease-in-out dark:text-white"
    >
      {instructorInfo.lastName}, {instructorInfo.firstName?.charAt(0)}.
    </Link>
  ) : (
    'Unknown Instructor'
  );

  return (
    <div className="mb-4">
      <Link
        href={url}
        className="text-md font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500"
      >
        {subject} {number} - {title}
      </Link>
      <p>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {role}, {semester} {year} at {university},{' '}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-300">Instructor: {instructorName}</span>
      </p>
    </div>
  );
}

function Course({ name, description, url }: any) {
  return (
    <li className="text-xs text-gray-600 dark:text-gray-400">
      <Link href={url} className="hover:text-blue-600 dark:hover:text-blue-500">
        {name}
      </Link>
      : {description}
    </li>
  );
}

function Advisor({ people, orcid }: { people: People; orcid: string }) {
  const advisor = people.find((p) => p.orcid === orcid);
  if (!advisor) return <span>Unknown Advisor</span>;
  return (
    <span>
      <Link href={advisor.url || '#'} className="hover:text-blue-600 dark:hover:text-blue-500">
        {advisor.lastName}, {advisor.firstName?.charAt(0)}.
      </Link>
    </span>
  );
}

function Education({
  people,
  degree,
  field,
  school,
  schoolUrl,
  schoolSeal,
  url,
  location,
  startYear,
  endYear,
  courses,
  showCourses = false,
  advisors = [],
  dissertationTitle,
}: any) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  const groupedAdvisors = (advisors as any[]).reduce((acc: Record<string, any[]>, a: any) => {
    const { role } = a;
    if (!acc[role]) acc[role] = [];
    acc[role].push(<Advisor key={a.orcid} people={people} {...a} />);
    return acc;
  }, {});

  const advisorsDisplay = Object.entries(groupedAdvisors).map(([role, comps], i) => (
    <span key={i}>
      {role}:{' '}
      {(comps as any[]).reduce((prev: any[], curr: any, idx: number) => [...prev, idx > 0 ? ', ' : '', curr], [])}
      {' '}
    </span>
  ));

  const displayYears = startYear === endYear ? startYear : `${startYear} - ${endYear}`;

  return (
    <div className="mb-6 flex">
      <Image
        src={schoolSeal}
        alt={`Seal of ${school}`}
        width={12}
        height={12}
        loading="eager"
        priority
        className="w-12 h-12 mr-4 dark:invert"
      />
      <div className="flex-1">
        <Link
          href={url}
          className="text-md sm:text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500"
        >
          {degree}
          {field && ` in ${field}`}
        </Link>
        <span className="text-gray-700 dark:text-gray-300">{', '}</span>
        <span className="text-sm sm:text-md text-gray-600 dark:text-gray-400">{displayYears}</span>
        <div className="text-xs sm:text-sm">
          <Link
            href={schoolUrl}
            className="font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
          >
            {school}
          </Link>
          <span className="text-gray-700 dark:text-gray-300">{', '}</span>
          <span className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
            <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {location}
            </Link>
          </span>
        </div>
        {dissertationTitle && (
          <div className="mt-1 text-sm text-pretty">
            <strong>Thesis:</strong> {dissertationTitle}
          </div>
        )}
        {advisors && advisors.length > 0 && <div className="mt-1 text-sm">{advisorsDisplay}</div>}
        {showCourses && courses?.length > 0 && (
          <ul className="mt-2">
            {courses.map((c: any, idx: number) => (
              <Course key={idx} {...c} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Experience({ title, company, companyUrl, location, startDate, endDate }: any) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const duration = differenceInMonths(end, start);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  return (
    <div className="mb-4">
      <div className="text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500">
        <Link href={companyUrl} target="_blank" rel="noopener noreferrer">
          {company}
        </Link>
      </div>
      <div className="text-lg text-gray-700 dark:text-gray-300">{title}</div>
      <div className="text-sm text-gray-500 dark:text-gray-300">
        {format(start, 'MMM yyyy')} - {format(end, 'MMM yyyy')} · {duration} months
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
          {location}
        </Link>
      </div>
    </div>
  );
}

function Affiliations({
  people,
  role,
  lab,
  labUrl,
  lead,
  institution,
  institutionUrl,
  location,
  startDate,
  endDate,
}: any) {
  const start = parseISO(startDate);
  let duration: string;
  if (String(endDate).toLowerCase() === 'present') {
    duration = `${format(start, 'MMM yyyy')} - Present`;
  } else {
    const end = parseISO(endDate);
    duration = `${format(start, 'MMM yyyy')} - ${format(end, 'MMM yyyy')}`;
  }

  const leadPerson =
    people.find((p) => p.orcid === lead) || ({ firstName: 'Unknown', lastName: 'Lead', url: '#' } as Person);

  return (
    <div className="mb-4">
      <div className="text-md text-gray-700 dark:text-gray-300">
        <Link href={labUrl} target="_blank" rel="noopener noreferrer" className="font-semibold">
          {lab}
        </Link>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-300">
        <span>{role}</span>
        {', '}
        <span>Duration: {duration}</span>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <Link href={institutionUrl} target="_blank" rel="noopener noreferrer">
          {institution}
        </Link>
        ,
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 dark:hover:text-blue-500"
        >
          {' '}
          {location}
        </a>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">
        Lead:{' '}
        <Link href={leadPerson.url || '#'} className="hover:text-blue-600 dark:hover:text-blue-500">
          {leadPerson.lastName}, {leadPerson.firstName?.charAt(0)}.
        </Link>
      </div>
    </div>
  );
}

function Talk({ title, venue, link }: any) {
  return (
    <div className="mb-4">
      <p className="text-md font-medium text-gray-800 dark:text-gray-200">
        <Link href={link}>{title}</Link>, {venue}
      </p>
    </div>
  );
}

function Service({
  role,
  organizationShortName,
  organizationUrl,
  startDate,
  endDate,
}: any) {
  const start = parseISO(startDate);
  let end: Date | undefined;
  let durationString: string;
  let totalDuration: string | undefined;

  if (String(endDate).toLowerCase() === 'present') {
    end = new Date();
    durationString = `${format(start, 'MMM yyyy')} - Present`;
  } else {
    end = parseISO(endDate);
    const months = differenceInMonths(end, start);
    durationString = months === 0 ? format(start, 'yyyy') : `${format(start, 'MMM yyyy')} - ${format(end, 'MMM yyyy')}`;
  }

  if (end) {
    const months = differenceInMonths(end, start);
    if (months < 12) totalDuration = `${months} month${months === 1 ? '' : 's'}`;
    else {
      const years = Math.floor(months / 12);
      const rem = months % 12;
      totalDuration = `${years} year${years === 1 ? '' : 's'}${rem ? ` ${rem} month${rem === 1 ? '' : 's'}` : ''}`;
    }
  }

  return (
    <div className="mb-2">
      <div className="text-md font-medium text-gray-800 dark:text-gray-200">
        <span className="font-semibold">{role}</span>
        {', '}
        <Link href={organizationUrl} target="_blank" rel="noopener noreferrer">
          {organizationShortName}
        </Link>
        {', '}
        <span className="text-sm text-gray-500 dark:text-gray-300">
          {durationString}
          {totalDuration && ` · ${totalDuration}`}
        </span>
      </div>
    </div>
  );
}

function Grant({
  people,
  name,
  institution,
  institutionUrl,
  coauthors = [],
  description,
  amount,
  currency = 'USD',
  date,
  awardUrl,
}: any) {
  const coauthorLinks = coauthors.map((orcid: string, idx: number) => {
    const found = people.find((p) => p.orcid === orcid);
    if (found) {
      const isInternal = found.orcid === '0000-0002-8506-3785';
      return (
        <span key={idx} className="mr-1">
          <Link
            href={found.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`${isInternal ? 'font-bold' : ''} hover:underline underline-offset-2 decoration-[0.1em] transition duration-300 ease-in-out dark:text-white`}
          >
            {found.lastName}, {found.firstName?.charAt(0)}.
          </Link>
          {idx < coauthors.length - 1 ? ', ' : ''}
        </span>
      );
    }
    return (
      <span key={idx} className="mr-1 text-gray-600 dark:text-gray-400">
        Unknown Author{idx < coauthors.length - 1 ? ', ' : ''}
      </span>
    );
  });

  const amountLabel =
    amount === undefined || amount === null || amount === ''
      ? null
      : typeof amount === 'string'
      ? amount
      : (() => {
          try {
            return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount);
          } catch {
            return `$${Number(amount).toLocaleString()}`;
          }
        })();

  const dateLabel = date
    ? new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
    : null;

  return (
    <div className="mb-4">
      <div className="text-md font-semibold text-gray-800 dark:text-gray-200">
        {awardUrl ? (
          <Link href={awardUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-500">
            {name}
          </Link>
        ) : (
          name
        )}
        {amountLabel && <span className="ml-2 text-xs font-normal text-gray-600 dark:text-gray-400">· {amountLabel}</span>}
        {dateLabel && <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">· {dateLabel}</span>}
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300">
        {institutionUrl ? (
          <Link href={institutionUrl} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2 decoration-[0.1em] dark:text-white">
            {institution}
          </Link>
        ) : (
          <span>{institution}</span>
        )}
      </div>

      {coauthors.length > 0 && <div className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">Co-authors: {coauthorLinks}</div>}

      {description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{description}</p>}
    </div>
  );
}

function Artifact({ name, description, releaseUrl, codeUrl, docsUrl, version, releasedAt }: any) {
  const dateLabel = releasedAt
    ? new Date(releasedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
    : null;

  return (
    <div className="mb-4">
      <div className="text-md font-medium text-gray-800 dark:text-gray-200">
        {name}
        {version && <span className="ml-2 text-xs font-normal text-gray-600 dark:text-gray-400">{version}</span>}
        {dateLabel && <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">· {dateLabel}</span>}
      </div>

      {description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">{description}</p>}

      <div className="mt-1 flex flex-wrap gap-3 text-sm">
        {releaseUrl && (
          <Link href={releaseUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline dark:text-blue-400">
            Released
          </Link>
        )}
        {codeUrl && (
          <Link href={codeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline dark:text-blue-400">
            Code
          </Link>
        )}
        {docsUrl && (
          <Link href={docsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline dark:text-blue-400">
            Docs
          </Link>
        )}
      </div>
    </div>
  );
}

function License({
  name,
  level,
  licenseId,
  issuer,
  issuerShort,
  issuerUrl,
  jurisdiction,
  status,
  currentStartDate,
  expirationDate,
  initialCertificationDate,
  grantedBy,
  verificationUrl,
  documentUrl,
  notes = [],
  tags = [],
}: any) {
  const fmt = (iso?: string) => (iso ? format(parseISO(iso), 'MMM d, yyyy') : undefined);
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <div className="text-md font-semibold text-gray-800 dark:text-gray-200">
          {name}
          {level ? ` — ${level}` : ''}
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300">
        {issuerUrl ? (
          <Link href={issuerUrl} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2 decoration-[0.1em] dark:text-white">
            {issuerShort || issuer}
          </Link>
        ) : (
          issuerShort || issuer
        )}
        {jurisdiction ? <span className="text-gray-500 dark:text-gray-400">, {jurisdiction}</span> : null}
      </div>

      <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
        {licenseId && (
          <span className="mr-3">
            ID: <span className="font-mono">{licenseId}</span>
          </span>
        )}
        {currentStartDate && <span className="mr-3">Start: {fmt(currentStartDate)}</span>}
        {expirationDate && <span className="mr-3">Expires: {fmt(expirationDate)}</span>}
        {initialCertificationDate && <span className="mr-3">Initial: {fmt(initialCertificationDate)}</span>}
        {grantedBy && <span className="mr-3">Granted by: {grantedBy}</span>}
      </div>

      {(verificationUrl || documentUrl) && (
        <div className="mt-1 flex flex-wrap gap-3 text-sm">
          {verificationUrl && (
            <Link href={verificationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline dark:text-blue-400">
              Verify
            </Link>
          )}
          {documentUrl && (
            <Link href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline dark:text-blue-400">
              Certificate
            </Link>
          )}
        </div>
      )}

      {tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1">
          {tags.map((t: string, i: number) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {t}
            </span>
          ))}
        </div>
      )}

      {notes.length > 0 && (
        <ul className="mt-1 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
          {notes.map((n: string, i: number) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Membership({
  organization,             // e.g., "Association for Computing Machinery"
  shortName,                // e.g., "ACM SIGCHI"
  organizationUrl,          // e.g., "https://www.acm.org"
  membershipType,           // e.g., "Student Member"
  memberId,                 // e.g., "8267670"
  startDate,                // ISO string
  endDate,                  // ISO string
  status = 'Active',        // not shown but kept for future
  cost,                     // e.g., "$60/year"
  verificationUrl,          // not shown but kept for future
  notes = [] as string[],   // optional bullet points
}: {
  organization: string;
  shortName: string;
  organizationUrl: string;
  membershipType?: string;
  memberId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  cost?: string;
  verificationUrl?: string;
  notes?: string[];
}) {
  const fmt = (iso?: string) => (iso ? format(parseISO(iso), 'MMM d, yyyy') : undefined);

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <div className="text-md font-semibold text-gray-800 dark:text-gray-200">
          {shortName}
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300">
        {organizationUrl ? (
          <Link
            href={organizationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-2 decoration-[0.1em] dark:text-white"
          >
            {organization}
          </Link>
        ) : (
          organization
        )}
      </div>

      <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
        {membershipType && <span className="mr-3">{membershipType}</span>}
        {memberId && <span className="mr-3">ID: {memberId}</span>}
        {startDate && endDate && (
          <span className="mr-3">
            {fmt(startDate)} – {fmt(endDate)}
          </span>
        )}
        {cost && <span className="mr-3">{cost}</span>}
      </div>

      {notes.length > 0 && (
        <ul className="mt-1 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
          {notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}


/* ---------- Page (server component) ---------- */

async function loadJSON<T = any>(relPath: string): Promise<T> {
  const filePath = path.join(process.cwd(), 'public', relPath);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export default async function Page() {
  // Load both JSON files from /public/work/
  const [people, work] = await Promise.all([
    loadJSON<People>('work/people.json'),
    loadJSON<any>('work/work.json'),
  ]);

  return (
    <section>
      {/* Research Interests */}
      {work.researchInterests && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Research Interests</h1>
          <p className="prose prose-neutral dark:prose-invert max-w-none text-pretty">
            {work.researchInterests}
          </p>
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Publications */}
      {work.publications?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Publications</h1>
          {work.publications.map((p: any, i: number) => (
            <Publication key={i} people={people} {...p} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Education */}
      {work.education?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Education</h1>
          {work.education.map((e: any, i: number) => (
            <Education key={i} people={people} {...e} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Research Affiliations */}
      {work.affiliations?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Research Affiliations</h1>
          {work.affiliations.map((a: any, i: number) => (
            <Affiliations key={i} people={people} {...a} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Teaching */}
      {work.teaching?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Teaching</h1>
          {work.teaching.map((c: any, i: number) => (
            <Class key={i} people={people} {...c} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Posters and Demos (reuse Publication) */}
      {work.postersAndDemos?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Posters and Demos</h1>
          {work.postersAndDemos.map((p: any, i: number) => (
            <Publication key={i} people={people} {...p} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Service */}
      {work.service?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Service</h1>
          {work.service.map((s: any, i: number) => (
            <Service key={i} {...s} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Talks and Tutorials */}
      {work.talks?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Talks and Tutorials</h1>
          {work.talks.map((t: any, i: number) => (
            <Talk key={i} {...t} />
          ))}
          {work.talksExtraNote && <p>{work.talksExtraNote}</p>}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Grants */}
      {work.grants?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Grants</h1>
          {work.grants.map((g: any, i: number) => (
            <Grant key={i} people={people} {...g} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Industry (Experience) */}
      {work.industry?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Industry</h1>
          {work.industry.map((x: any, i: number) => (
            <Experience key={i} {...x} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Organizations (Memberships) */}
      {work.organizations?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Organizations</h1>
          {work.organizations.map((m: any, i: number) => (
            <Membership key={i} {...m} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Leadership (Experience) */}
      {work.leadership?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Leadership</h1>
          {work.leadership.map((x: any, i: number) => (
            <Experience key={i} {...x} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Artifacts */}
      {work.artifacts?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Artifacts</h1>
          {work.artifacts.map((a: any, i: number) => (
            <Artifact key={i} {...a} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Personal Projects (also artifacts) */}
      {work.personalProjects?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tighter">Personal Projects</h1>
          {work.personalProjects.map((a: any, i: number) => (
            <Artifact key={i} {...a} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Mentoring (Experience) */}
      {work.mentoring?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tetter">Mentoring</h1>
          {work.mentoring.map((x: any, i: number) => (
            <Experience key={i} {...x} />
          ))}
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        </>
      )}

      {/* Certifications (Licenses) */}
      {work.certifications?.length > 0 && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tetter">Certifications</h1>
          {work.certifications.map((l: any, i: number) => (
            <License key={i} {...l} />
          ))}
        </>
      )}
    </section>
  );
}
