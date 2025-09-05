'use client';

import { useState } from 'react';
import blobStream from 'blob-stream';

type Person = { firstName: string; middleName?: string; lastName: string; orcid: string; url?: string };
type People = Person[];

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

const YEAR = new Date().getFullYear();
const FILE_BASENAME = `jonathan_segal_cv_${YEAR}`;

export default function DownloadCV() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const dlJSON = () => {
    const a = document.createElement('a');
    a.href = '/work/work.json';
    a.download = `${FILE_BASENAME}.json`;
    a.click();
  };

  const handlePDF = async () => {
    setBusy(true);
    setErr(null);
    try {
      const [work, people] = await Promise.all([
        fetchJSON<any>('/work/work.json'),
        fetchJSON<People>('/work/people.json'),
      ]);

      // Use the browser-ready bundle
      const { default: PDFDocument } = await import('pdfkit/js/pdfkit.standalone.js');
      const doc = new PDFDocument({
        size: 'A4',
        margin: 72, // 1 inch margins
        autoFirstPage: true,
        info: {
          Title: `Jonathan Segal CV ${YEAR}`,
          Author: 'Jonathan Segal',
          Subject: 'Curriculum Vitae',
        },
      });

      const stream = doc.pipe(blobStream());

      /* ---------- Typographic helpers ---------- */
      const W = () => doc.page.width;
      const M = () => doc.page.margins.left;
      const innerW = () => W() - M() * 2;

      const black = '#000000';
      const fontBody = 'Helvetica';
      const fontBold = 'Helvetica-Bold';
      const fontItalic = 'Helvetica-Oblique';

      // Defaults tuned to resume scale (smaller)
      const body = (t = '', opts: any = {}) =>
        doc
          .fillColor(black)
          .font(fontBody)
          .fontSize(10.25)
          .text(t, {
            width: innerW(),
            lineGap: 1.0,
            paragraphGap: 2,
            ...opts,
          });

      const small = (t = '', opts: any = {}) =>
        doc
          .fillColor(black)
          .font(fontBody)
          .fontSize(9)
          .text(t, {
            width: innerW(),
            lineGap: 0.8,
            paragraphGap: 1,
            ...opts,
          });

      const h1 = (t: string) =>
        doc
          .moveDown(0.35)
          .fillColor(black)
          .font(fontBold)
          .fontSize(14)
          .text(t, { width: innerW() })
          .moveDown(0.15);

      const h2 = (t: string) =>
        doc
          .fillColor(black)
          .font(fontBold)
          .fontSize(11.25)
          .text(t, { width: innerW() });

      const ital = (t: string, opts: any = {}) =>
        doc.fillColor(black).font(fontItalic).fontSize(10.25).text(t, { width: innerW(), ...opts });

      // Make any line/paragraph clickable while keeping black text
      const linkPara = (text: string, url?: string, opts: any = {}) => {
        const startX = doc.x;
        const startY = doc.y;
        const width = innerW();
        const height = doc.heightOfString(text, { width, ...opts });
        body(text, opts);
        if (url) doc.link(startX, startY, width, height, url);
      };

      const fullNameInitial = (p?: Person) =>
        p ? `${p.lastName}, ${p.firstName ? p.firstName.charAt(0) + '.' : ''}` : 'Unknown';

      const find = (id: string) => people.find((p) => p.orcid === id);

      /* ---------- Header ---------- */
      doc
        .fillColor(black)
        .font(fontBold)
        .fontSize(22)
        .text('Jonathan Segal', { width: innerW() });

      small('jis62@cornell.edu    jonathansegal.io');
      small('linkedin.com/in/jonathannsegal    github.com/jonathannsegal');

      /* ---------- Research Interests ---------- */
      if (work.researchInterests) {
        h1('Research Interests');
        body(work.researchInterests);
      }

      /* ---------- Education ---------- */
      if (work.education?.length) {
        h1('Education');
        work.education.forEach((e: any) => {
          const years = e.startYear === e.endYear ? e.startYear : `${e.startYear} - ${e.endYear}`;
          h2(`${e.degree}${e.field ? `, ${e.field}` : ''} (${years})`);
          doc.font(fontBold).fontSize(10.25).fillColor(black).text(e.school, { continued: true });
          doc.font(fontBody).text(`, ${e.location}`);
          if (e.dissertationTitle) {
            doc.moveDown(0.05);
            doc.font(fontBold).text('Thesis: ', { continued: true });
            ital(e.dissertationTitle);
          }
          if (e.advisors?.length) {
            const advisorsByRole = e.advisors.reduce((acc: any, a: any) => {
              (acc[a.role] ||= []).push(fullNameInitial(find(a.orcid)));
              return acc;
            }, {});
            const flat = Object.entries(advisorsByRole)
              .map(([role, arr]: any) => `${role}: ${arr.join(', ')}`)
              .join('    ');
            body(`Advisors: ${flat}`);
          }
          doc.moveDown(0.3);
        });
      }

      /* ---------- Publications ---------- */
      if (work.publications?.length) {
        h1('Publications');
        work.publications.forEach((p: any, i: number) => {
          const authors = (p.author || []).map((id: string) => fullNameInitial(find(id))).join(', ');
          small(`${i + 1}. ${authors}`);
          // title is clickable if doi present
          linkPara(p.title, p.doi);
          const meta: string[] = [];
          if (p.booktitle) meta.push(p.booktitle);
          if (p.conference) meta.push(p.conference);
          if (p.year) meta.push(String(p.year));
          if (meta.length) small(meta.join(', '));
          if (p.cofirst !== false && Array.isArray(p.cofirst) && p.cofirst.length) {
            small('* Authors contributed to this work equally');
          }
          doc.moveDown(0.25);
        });
      }

      /* ---------- Research Affiliations ---------- */
      if (work.affiliations?.length) {
        h1('Research Affiliations');
        work.affiliations.forEach((a: any) => {
          h2(a.lab);
          body(`${a.role}`);
          const line = `${a.institution}${a.location ? ` — ${a.location}` : ''}`;
          linkPara(line, a.institutionUrl);
          // lead inline
          const lead = fullNameInitial(find(a.lead));
          small(`Lead: ${lead}`);
          small(`${a.startDate} – ${a.endDate}`);
          doc.moveDown(0.2);
        });
      }

      /* ---------- Teaching ---------- */
      if (work.teaching?.length) {
        h1('Teaching');
        work.teaching.forEach((c: any) => {
          h2(`${c.subject} ${c.number} — ${c.title}`);
          const inst = fullNameInitial(find(c.instructor));
          const line = `${c.role}, ${c.semester} ${c.year} at ${c.university} · Instructor: ${inst}`;
          linkPara(line, c.url);
          doc.moveDown(0.2);
        });
      }

      /* ---------- Posters & Demos (same as pubs) ---------- */
      if (work.postersAndDemos?.length) {
        h1('Posters & Demos');
        work.postersAndDemos.forEach((p: any, i: number) => {
          const authors = (p.author || []).map((id: string) => fullNameInitial(find(id))).join(', ');
          small(`${i + 1}. ${authors}`);
          linkPara(p.title, p.doi);
          const meta: string[] = [];
          if (p.conference) meta.push(p.conference);
          if (p.address) meta.push(p.address);
          if (p.date) meta.push(p.date);
          if (p.year) meta.push(String(p.year));
          if (meta.length) small(meta.join(', '));
          doc.moveDown(0.2);
        });
      }

      /* ---------- Service ---------- */
      if (work.service?.length) {
        h1('Service');
        work.service.forEach((s: any) => {
          h2(s.role);
          linkPara(`${s.organizationShortName}`, s.organizationUrl);
          small(`${fmt(s.startDate)} – ${fmt(s.endDate)}`);
          doc.moveDown(0.15);
        });
      }

      /* ---------- Talks & Tutorials ---------- */
      if (work.talks?.length) {
        h1('Talks & Tutorials');
        work.talks.forEach((t: any) => {
          linkPara(`${t.title}, ${t.venue}`, t.link);
          doc.moveDown(0.1);
        });
        if (work.talksExtraNote) small(work.talksExtraNote);
      }

      /* ---------- Grants ---------- */
      if (work.grants?.length) {
        h1('Grants');
        work.grants.forEach((g: any) => {
          const co = (g.coauthors || [])
            .map((id: string) => fullNameInitial(find(id)))
            .join(', ');
          const amount =
            g.amount == null
              ? ''
              : typeof g.amount === 'string'
              ? g.amount
              : new Intl.NumberFormat(undefined, { style: 'currency', currency: g.currency || 'USD' }).format(g.amount);
          h2(g.name);
          if (amount) small(amount);
          linkPara(g.institution, g.institutionUrl);
          if (co) small(`Co-authors: ${co}`);
          if (g.description) body(g.description);
          if (g.awardUrl) small(`Award: ${g.awardUrl}`); // clickable line already added via linkPara where useful
          doc.moveDown(0.25);
        });
      }

      /* ---------- Industry ---------- */
      if (work.industry?.length) {
        h1('Industry');
        work.industry.forEach((x: any) => {
          h2(x.title);
          linkPara(x.company, x.companyUrl);
          small(`${fmt(x.startDate)} – ${fmt(x.endDate)}`);
          if (x.location) small(x.location);
          doc.moveDown(0.15);
        });
      }

      /* ---------- Organizations ---------- */
      if (work.organizations?.length) {
        h1('Organizations');
        work.organizations.forEach((m: any) => {
          h2(m.shortName);
          linkPara(m.organization, m.organizationUrl);
          const time =
            m.startDate && m.endDate ? `${fmt(m.startDate)} – ${fmt(m.endDate)}` : m.startDate ? fmt(m.startDate) : '';
          small([m.membershipType, m.memberId ? `ID: ${m.memberId}` : '', time, m.cost].filter(Boolean).join(' · '));
          doc.moveDown(0.15);
        });
      }

      /* ---------- Leadership ---------- */
      if (work.leadership?.length) {
        h1('Leadership');
        work.leadership.forEach((x: any) => {
          h2(x.title);
          linkPara(x.company, x.companyUrl);
          small(`${fmt(x.startDate)} – ${fmt(x.endDate)}`);
          if (x.location) small(x.location);
          doc.moveDown(0.15);
        });
      }

      /* ---------- Artifacts ---------- */
      const artifactLine = (a: any) => {
        const bits: string[] = [];
        if (a.version) bits.push(a.version);
        if (a.releasedAt) bits.push(new Date(a.releasedAt).toLocaleDateString());
        return bits.length ? ` (${bits.join(' · ')})` : '';
      };

      if (work.artifacts?.length) {
        h1('Artifacts');
        work.artifacts.forEach((a: any) => {
          h2(`${a.name}${artifactLine(a)}`);
          if (a.description) body(a.description);
          // Make the whole line of resource labels clickable independently
        //   const links: Array<{ label: string; url?: string }> = [
        //     { label: 'Released', url: a.releaseUrl },
        //     { label: 'Code', url: a.codeUrl },
        //     { label: 'Docs', url: a.docsUrl },
        //   ].filter((x) => x.url);
        //   if (links.length) {
        //     const startY = doc.y;
        //     let first = true;
        //     links.forEach((L) => {
        //       if (!L.url) return;
        //       doc.fillColor(black).font(fontBody).fontSize(10.25).text(first ? L.label : `   ${L.label}`, { continued: true });
        //       // link rectangle just over last label
        //       const w = doc.widthOfString(L.label);
        //       const h = doc.currentLineHeight();
        //       const x = doc.x - w;
        //       doc.link(x, startY, w, h, L.url);
        //       first = false;
        //     });
        //     doc.text(''); // end continued
        //     doc.moveDown(0.1);
        //   }
        //   doc.moveDown(0.15);
        });
      }

      /* ---------- Personal Projects ---------- */
      if (work.personalProjects?.length) {
        h1('Personal Projects');
        work.personalProjects.forEach((a: any) => {
          h2(`${a.name}${artifactLine(a)}`);
          if (a.description) body(a.description);
          const links: Array<{ label: string; url?: string }> = [
            { label: 'Released', url: a.releaseUrl },
            { label: 'Code', url: a.codeUrl },
            { label: 'Docs', url: a.docsUrl },
          ].filter((x) => x.url);
          if (links.length) {
            const startY = doc.y;
            let first = true;
            links.forEach((L) => {
              if (!L.url) return;
              doc.fillColor(black).font(fontBody).fontSize(10.25).text(first ? L.label : `   ${L.label}`, { continued: true });
              const w = doc.widthOfString(L.label);
              const h = doc.currentLineHeight();
              const x = doc.x - w;
              doc.link(x, startY, w, h, L.url);
              first = false;
            });
            doc.text('');
          }
          doc.moveDown(0.15);
        });
      }

      /* ---------- Mentoring ---------- */
      if (work.mentoring?.length) {
        h1('Mentoring');
        work.mentoring.forEach((x: any) => {
          h2(x.title);
          linkPara(x.company, x.companyUrl);
          small(`${fmt(x.startDate)} – ${fmt(x.endDate)}`);
          if (x.location) small(x.location);
          doc.moveDown(0.15);
        });
      }

      /* ---------- Certifications ---------- */
      if (work.certifications?.length) {
        h1('Certifications');
        work.certifications.forEach((l: any) => {
          h2(`${l.name}${l.level ? ` — ${l.level}` : ''}`);
          const line = `${l.issuerShort || l.issuer}${l.jurisdiction ? `, ${l.jurisdiction}` : ''}`;
          linkPara(line, l.issuerUrl);
          const bits = [
            l.licenseId ? `ID: ${l.licenseId}` : '',
            l.expirationDate ? `Expires: ${fmt(l.expirationDate)}` : '',
          ].filter(Boolean);
          if (bits.length) small(bits.join(' · '));
          doc.moveDown(0.15);
        });
      }

      /* ---------- Save ---------- */
      doc.end();
      stream.on('finish', () => {
        const a = document.createElement('a');
        a.href = stream.toBlobURL('application/pdf');
        a.download = `${FILE_BASENAME}.pdf`;
        a.click();
        setBusy(false);
      });
    } catch (e: any) {
      setErr(e?.message || 'Failed to generate PDF');
      setBusy(false);
    }
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <button
        onClick={handlePDF}
        disabled={busy}
        className="px-3 py-1.5 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-black text-sm hover:opacity-90 disabled:opacity-50"
        title="Generate a PDF from your CV JSON"
      >
        {busy ? 'Generating…' : 'Download CV (PDF)'}
      </button>

      <button
        onClick={dlJSON}
        className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
        title="Download the raw CV JSON"
      >
        Download CV (JSON)
      </button>

      {err && <span className="text-xs text-red-500 ml-2">{err}</span>}
    </div>
  );
}

/* ---------- tiny util ---------- */
function fmt(iso?: string) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}
