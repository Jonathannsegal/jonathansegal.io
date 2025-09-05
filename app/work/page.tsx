import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
const DownloadCV = dynamic(() => import('./DownloadCV'), { ssr: false });
import Link from 'next/link';
import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import { differenceInMonths, format, parseISO } from 'date-fns';

/* ------------------ Meta ------------------ */
export const metadata: Metadata = {
  title: 'Work',
  description: 'A summary of my work and contributions.',
};

/* ------------------ Types ------------------ */
type Person = { firstName: string; middleName?: string; lastName: string; orcid: string; url?: string };
type People = Person[];
type Work = Record<string, any>;

/* ------------------ Utils ------------------ */
const loadJSON = async <T,>(relPath: string): Promise<T> =>
  JSON.parse(await fs.readFile(path.join(process.cwd(), 'public', relPath), 'utf-8')) as T;

const A = (p: any) => (
  <Link {...p} target={p.target ?? '_blank'} rel={p.rel ?? 'noopener noreferrer'} className={p.className ?? 'hover:underline'}>
    {p.children}
  </Link>
);

const fmt = (iso?: string) => (iso ? format(parseISO(iso), 'MMM d, yyyy') : undefined);
const ym = (iso: string) => format(parseISO(iso), 'MMM yyyy');
const range = (start: string, end?: string | 'Present') =>
  end && String(end).toLowerCase() !== 'present' ? `${ym(start)} - ${ym(end as string)}` : `${ym(start)} - Present`;

const durationLabel = (startISO: string, endISO?: string) => {
  const s = parseISO(startISO);
  const e = endISO && String(endISO).toLowerCase() !== 'present' ? parseISO(endISO) : new Date();
  const m = differenceInMonths(e, s);
  if (m < 12) return `${m} month${m === 1 ? '' : 's'}`;
  const y = Math.floor(m / 12), r = m % 12;
  return `${y} year${y === 1 ? '' : 's'}${r ? ` ${r} month${r === 1 ? '' : 's'}` : ''}`;
};

const findPerson = (people: People, orcid?: string) => people.find(p => p.orcid === orcid);
const nameInitial = (p?: Person) => (p ? `${p.lastName}, ${p.firstName?.charAt(0) || ''}.` : 'Unknown');

/* ------------------ Micro renderers ------------------ */
const AuthorList = ({ people, author, cofirst }: { people: People; author: string[]; cofirst: string[] | false }) => {
  const items = author.map((id) => {
    const p = findPerson(people, id);
    const isCo = cofirst !== false && Array.isArray(cofirst) && cofirst.includes(id);
    const me = p?.orcid === '0000-0002-8506-3785';
    return (
      <span key={id} className="mr-1">
        <A href={p?.url || '#'} className={`${me ? 'font-bold' : ''} hover:underline underline-offset-2 dark:text-white`}>
          {nameInitial(p)}
          {isCo ? '*' : ''}
        </A>
        ,{' '}
      </span>
    );
  });
  return <span className="text-sm text-gray-700 dark:text-gray-300">{items.length ? items.slice(0, -1) : items}{items.length ? <span>{nameInitial(findPerson(people, author.at(-1)))}</span> : null}</span>;
};

const MapLink = ({ q }: { q: string }) => (
  <A href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`} className="hover:text-blue-600 dark:hover:text-blue-500">
    {q}
  </A>
);

/* ------------------ Cards ------------------ */
const Publication = ({ people, author, cofirst, year, title, conference, doi }: any) => (
  <div className="mb-4">
    <AuthorList people={people} author={author} cofirst={cofirst} />
    <span className="text-sm text-gray-800 dark:text-gray-200">
      {' '}
      <A href={doi || '#'} className="italic text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500">
        {title}.
      </A>{' '}
      {conference ? <span>{conference}, </span> : null}
      <span>{year}. </span>
    </span>
    {cofirst !== false && <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">* Authors contributed to this work equally</div>}
  </div>
);

const Class = ({ people, subject, number, url, title, semester, year, instructor, role, university }: any) => {
  const inst = findPerson(people, instructor);
  return (
    <div className="mb-4">
      <A href={url} className="text-md font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500">
        {subject} {number} - {title}
      </A>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {role}, {semester} {year} at {university},{' '}
        <span className="text-gray-500 dark:text-gray-300">Instructor: <A href={inst?.url || '#'} className="hover:underline">{nameInitial(inst)}</A></span>
      </p>
    </div>
  );
};

const Education = ({ people, degree, field, school, schoolUrl, schoolSeal, url, location, startYear, endYear, courses, showCourses = false, advisors = [], dissertationTitle }: any) => {
  const grouped = advisors.reduce((acc: any, a: any) => ((acc[a.role] ??= []).push(a.orcid), acc), {} as Record<string, string[]>);
  const advisorsDisplay = Object.entries(grouped).map(([role, ids]) => (
    <span key={role} className="mr-2">
      {role}:{' '}
      {Array.isArray(ids)
        ? ids.map((id: string, i: number) => {
            const p = findPerson(people, id);
            return (
              <span key={id}>
                {p ? p.name : 'Unknown'}
                {i < ids.length - 1 ? ', ' : ''}
              </span>
            );
          })
        : null}
    </span>
  ));
  const years = startYear === endYear ? startYear : `${startYear} - ${endYear}`;

  return (
    <div className="mb-6 flex">
      <Image src={schoolSeal} alt={`Seal of ${school}`} width={48} height={48} loading="eager" priority className="w-12 h-12 mr-4 dark:invert" />
      <div className="flex-1">
        <A href={url} className="text-md sm:text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500">
          {degree}{field ? ` in ${field}` : ''}
        </A>
        <span className="text-gray-700 dark:text-gray-300">{', '}</span>
        <span className="text-sm sm:text-md text-gray-600 dark:text-gray-400">{years}</span>
        <div className="text-xs sm:text-sm">
          <A href={schoolUrl} className="font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">{school}</A>
          <span className="text-gray-700 dark:text-gray-300">{', '}</span>
          <span className="text-gray-600 dark:text-gray-400"><MapLink q={location} /></span>
        </div>
        {dissertationTitle && <div className="mt-1 text-sm text-pretty"><strong>Thesis:</strong> {dissertationTitle}</div>}
        {!!advisors.length && <div className="mt-1 text-sm">{advisorsDisplay}</div>}
        {showCourses && !!courses?.length && (
          <ul className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            {courses.map((c: any, i: number) => (
              <li key={i}><A href={c.url}>{c.name}</A>: {c.description}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Experience = ({ title, company, companyUrl, location, startDate, endDate }: any) => {
  const start = parseISO(startDate), end = parseISO(endDate);
  return (
    <div className="mb-4">
      <div className="text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500">
        <A href={companyUrl}>{company}</A>
      </div>
      <div className="text-lg text-gray-700 dark:text-gray-300">{title}</div>
      <div className="text-sm text-gray-500 dark:text-gray-300">
        {format(start, 'MMM yyyy')} - {format(end, 'MMM yyyy')} · {differenceInMonths(end, start)} months
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400"><MapLink q={location} /></div>
    </div>
  );
};

const Affiliations = ({ people, role, lab, labUrl, lead, institution, institutionUrl, location, startDate, endDate }: any) => {
  const leadP = findPerson(people, lead);
  return (
    <div className="mb-4">
      <div className="text-md text-gray-700 dark:text-gray-300"><A href={labUrl} className="font-semibold">{lab}</A></div>
      <div className="text-sm text-gray-500 dark:text-gray-300">{role}, Duration: {range(startDate, endDate)}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400"><A href={institutionUrl}>{institution}</A>, <MapLink q={location} /></div>
      <div className="text-sm text-gray-700 dark:text-gray-300">Lead: <A href={leadP?.url || '#'}>{nameInitial(leadP)}</A></div>
    </div>
  );
};

const Talk = ({ title, venue, link }: any) => (
  <div className="mb-4">
    <p className="text-md font-medium text-gray-800 dark:text-gray-200">
      <A href={link} target="_self">{title}</A>, {venue}
    </p>
  </div>
);

const Service = ({ role, organizationShortName, organizationUrl, startDate, endDate }: any) => (
  <div className="mb-2">
    <div className="text-md font-medium text-gray-800 dark:text-gray-200">
      <span className="font-semibold">{role}</span>, <A href={organizationUrl}>{organizationShortName}</A>,{' '}
      <span className="text-sm text-gray-500 dark:text-gray-300">
        {range(startDate, endDate)} · {durationLabel(startDate, endDate)}
      </span>
    </div>
  </div>
);

const Grant = ({ people, name, institution, institutionUrl, coauthors = [], description, amount, currency = 'USD', date, awardUrl }: any) => {
  const money =
    amount == null || amount === ''
      ? null
      : typeof amount === 'string'
      ? amount
      : (() => {
          try { return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount); }
          catch { return `$${Number(amount).toLocaleString()}`; }
        })();
  return (
    <div className="mb-4">
      <div className="text-md font-semibold text-gray-800 dark:text-gray-200">
        {awardUrl ? <A href={awardUrl} className="hover:text-blue-600 dark:hover:text-blue-500">{name}</A> : name}
        {money && <span className="ml-2 text-xs font-normal text-gray-600 dark:text-gray-400">· {money}</span>}
        {date && <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">· {fmt(date)}</span>}
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">{institutionUrl ? <A href={institutionUrl} className="hover:underline">{institution}</A> : <span>{institution}</span>}</div>
      {!!coauthors.length && (
        <div className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">
          Co-authors:{' '}
          {coauthors.map((id: string, i: number) => {
            const p = findPerson(people, id);
            return (
              <span key={id} className={`${p?.orcid === '0000-0002-8506-3785' ? 'font-bold' : ''}`}>
                {i ? ', ' : ''}
                <A href={p?.url || '#'}>{nameInitial(p)}</A>
              </span>
            );
          })}
        </div>
      )}
      {description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{description}</p>}
    </div>
  );
};

const Artifact = ({ name, description, releaseUrl, codeUrl, docsUrl, version, releasedAt }: any) => (
  <div className="mb-4">
    <div className="text-md font-medium text-gray-800 dark:text-gray-200">
      {name}
      {version && <span className="ml-2 text-xs font-normal text-gray-600 dark:text-gray-400">{version}</span>}
      {releasedAt && <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">· {fmt(releasedAt)}</span>}
    </div>
    {description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">{description}</p>}
    <div className="mt-1 flex flex-wrap gap-3 text-sm">
      {releaseUrl && <A href={releaseUrl} className="text-blue-700 dark:text-blue-400">Released</A>}
      {codeUrl && <A href={codeUrl} className="text-blue-700 dark:text-blue-400">Code</A>}
      {docsUrl && <A href={docsUrl} className="text-blue-700 dark:text-blue-400">Docs</A>}
    </div>
  </div>
);

const License = ({ name, level, licenseId, issuer, issuerShort, issuerUrl, jurisdiction, currentStartDate, expirationDate, initialCertificationDate, grantedBy, verificationUrl, documentUrl, notes = [], tags = [] }: any) => (
  <div className="mb-4">
    <div className="flex items-center gap-2">
      <div className="text-md font-semibold text-gray-800 dark:text-gray-200">{name}{level ? ` — ${level}` : ''}</div>
    </div>
    <div className="text-sm text-gray-700 dark:text-gray-300">
      {issuerUrl ? <A href={issuerUrl} className="hover:underline underline-offset-2 dark:text-white">{issuerShort || issuer}</A> : (issuerShort || issuer)}
      {jurisdiction ? <span className="text-gray-500 dark:text-gray-400">, {jurisdiction}</span> : null}
    </div>
    <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
      {licenseId && <span className="mr-3">ID: <span className="font-mono">{licenseId}</span></span>}
      {currentStartDate && <span className="mr-3">Start: {fmt(currentStartDate)}</span>}
      {expirationDate && <span className="mr-3">Expires: {fmt(expirationDate)}</span>}
      {initialCertificationDate && <span className="mr-3">Initial: {fmt(initialCertificationDate)}</span>}
      {grantedBy && <span className="mr-3">Granted by: {grantedBy}</span>}
    </div>
    {(verificationUrl || documentUrl) && (
      <div className="mt-1 flex flex-wrap gap-3 text-sm">
        {verificationUrl && <A href={verificationUrl} className="text-blue-700 dark:text-blue-400">Verify</A>}
        {documentUrl && <A href={documentUrl} className="text-blue-700 dark:text-blue-400">Certificate</A>}
      </div>
    )}
    {!!tags.length && (
      <div className="mt-1 flex flex-wrap gap-1">
        {tags.map((t: string, i: number) => (
          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">{t}</span>
        ))}
      </div>
    )}
    {!!notes.length && (
      <ul className="mt-1 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
        {notes.map((n: string, i: number) => <li key={i}>{n}</li>)}
      </ul>
    )}
  </div>
);

const Membership = ({ organization, shortName, organizationUrl, membershipType, memberId, startDate, endDate, cost, notes = [] }: any) => (
  <div className="mb-4">
    <div className="flex items-center gap-2">
      <div className="text-md font-semibold text-gray-800 dark:text-gray-200">{shortName}</div>
    </div>
    <div className="text-sm text-gray-700 dark:text-gray-300">
      {organizationUrl ? <A href={organizationUrl} className="hover:underline underline-offset-2 dark:text-white">{organization}</A> : organization}
    </div>
    <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
      {membershipType && <span className="mr-3">{membershipType}</span>}
      {memberId && <span className="mr-3">ID: {memberId}</span>}
      {startDate && endDate && <span className="mr-3">{fmt(startDate)} – {fmt(endDate)}</span>}
      {cost && <span className="mr-3">{cost}</span>}
    </div>
    {!!notes.length && (
      <ul className="mt-1 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
        {notes.map((n: string, i: number) => <li key={i}>{n}</li>)}
      </ul>
    )}
  </div>
);

/* ------------------ Generic section helpers ------------------ */
const Section = ({ title, children }: { title: string; children: any }) => (
  <>
    <h1 className="font-medium text-2xl mb-6 tracking-tighter">{title}</h1>
    {children}
    <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
  </>
);

const List = ({ data, render }: { data?: any[]; render: (item: any, i: number) => any }) =>
  Array.isArray(data) && data.length ? data.map(render) : null;

/* ------------------ Page ------------------ */
export default async function Page() {
  const [people, work] = await Promise.all([
    loadJSON<People>('work/people.json'),
    loadJSON<Work>('work/work.json'),
  ]);

  return (
    <section>
      {work.researchInterests && (
        <Section title="Research Interests"> <DownloadCV />
          <p className="prose prose-neutral dark:prose-invert max-w-none text-pretty">{work.researchInterests}</p>
        </Section>
      )}

      {!!work.publications?.length && (
        <Section title="Publications">
          <List data={work.publications} render={(p, i) => <Publication key={i} people={people} {...p} />} />
        </Section>
      )}

      {!!work.education?.length && (
        <Section title="Education">
          <List data={work.education} render={(e, i) => <Education key={i} people={people} {...e} />} />
        </Section>
      )}

      {!!work.affiliations?.length && (
        <Section title="Research Affiliations">
          <List data={work.affiliations} render={(a, i) => <Affiliations key={i} people={people} {...a} />} />
        </Section>
      )}

      {!!work.teaching?.length && (
        <Section title="Teaching">
          <List data={work.teaching} render={(c, i) => <Class key={i} people={people} {...c} />} />
        </Section>
      )}

      {!!work.postersAndDemos?.length && (
        <Section title="Posters and Demos">
          <List data={work.postersAndDemos} render={(p, i) => <Publication key={i} people={people} {...p} />} />
        </Section>
      )}

      {!!work.service?.length && (
        <Section title="Service">
          <List data={work.service} render={(s, i) => <Service key={i} {...s} />} />
        </Section>
      )}

      {!!work.talks?.length && (
        <Section title="Talks and Tutorials">
          <List data={work.talks} render={(t, i) => <Talk key={i} {...t} />} />
          {work.talksExtraNote && <p>{work.talksExtraNote}</p>}
        </Section>
      )}

      {!!work.grants?.length && (
        <Section title="Grants">
          <List data={work.grants} render={(g, i) => <Grant key={i} people={people} {...g} />} />
        </Section>
      )}

      {!!work.industry?.length && (
        <Section title="Industry">
          <List data={work.industry} render={(x, i) => <Experience key={i} {...x} />} />
        </Section>
      )}

      {!!work.organizations?.length && (
        <Section title="Organizations">
          <List data={work.organizations} render={(m, i) => <Membership key={i} {...m} />} />
        </Section>
      )}

      {!!work.leadership?.length && (
        <Section title="Leadership">
          <List data={work.leadership} render={(x, i) => <Experience key={i} {...x} />} />
        </Section>
      )}

      {!!work.artifacts?.length && (
        <Section title="Artifacts">
          <List data={work.artifacts} render={(a, i) => <Artifact key={i} {...a} />} />
        </Section>
      )}

      {!!work.personalProjects?.length && (
        <Section title="Personal Projects">
          <List data={work.personalProjects} render={(a, i) => <Artifact key={i} {...a} />} />
        </Section>
      )}

      {!!work.mentoring?.length && (
        <Section title="Mentoring">
          <List data={work.mentoring} render={(x, i) => <Experience key={i} {...x} />} />
        </Section>
      )}

      {!!work.certifications?.length && (
        <>
          <h1 className="font-medium text-2xl mb-6 tracking-tetter">Certifications</h1>
          <List data={work.certifications} render={(l, i) => <License key={i} {...l} />} />
        </>
      )}
    </section>
  );
}
