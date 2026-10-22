import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const root = fileURLToPath(new URL('../', import.meta.url));
const esc = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const icon = (body, cls = '') => `<svg class="icon ${cls}" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
const arrowNE = icon('<path d="M6 18 18 6M6 6h12v12"/>');

export async function build() {
  const { default: c } = await import(`${new URL('../content.mjs', import.meta.url).href}?v=${Date.now()}`);
  const dist = path.join(root, 'dist');
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(path.join(root, 'public'), dist, { recursive: true });
  await Promise.all(['styles.css', 'app.js'].map(name => cp(path.join(root, 'src', name), path.join(dist, name))));
  const slots = {
    PAGE_TITLE: `${esc(c.name)} — Simulation, Digital Humans & Robotics`,
    DESCRIPTION: esc(c.description), NAME: esc(c.name), ROLE: esc(c.title), COMPANY: esc(c.company), COMPANY_URL: esc(c.companyUrl),
    LOCATION: esc(c.location), EMAIL: esc(c.email), LINKEDIN: esc(c.linkedin), GITHUB: esc(c.github), YEAR: new Date().getFullYear(),
    INTRO: esc(c.intro), ARROW_NE: arrowNE,
    SUN: icon('<circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>', 'sun-icon'),
    MOON: icon('<path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/>', 'moon-icon'),
    PIN: icon('<path d="M18 10c0 5-6 10-6 10S6 15 6 10a6 6 0 1 1 12 0Z"/><circle cx="12" cy="10" r="2"/>'),
    MAIL: icon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>'),
    LINKEDIN_ICON: icon('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7m0-10v.1M12 17v-7m0 3a3 3 0 0 1 6 0v4"/>'),
    GITHUB_ICON: icon('<path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.5c3.5-.4 7-1.7 7-7.5a6 6 0 0 0-1.7-4.2A5.5 5.5 0 0 0 19.2 0S17.8-.4 15 1.6a15 15 0 0 0-6 0C6.2-.4 4.8 0 4.8 0a5.5 5.5 0 0 0-.1 3.8A6 6 0 0 0 3 8c0 5.8 3.5 7.1 7 7.5A3.5 3.5 0 0 0 9 18v4" transform="translate(1 2) scale(.88)"/>'),
    WORK: c.work.map(p => `<li class="work-item"><h3>${esc(p.name)}</h3><p class="work-description">${esc(p.description)}</p>${p.href ? `<a class="work-link" href="${esc(p.href)}" target="_blank" rel="noopener noreferrer">${esc(p.linkLabel || p.name)}${arrowNE}<span class="sr-only"> (opens in a new tab)</span></a>` : ''}</li>`).join(''),
    RESEARCH: c.research.map(p => `<a class="research-link" href="${esc(p.href)}" target="_blank" rel="noopener noreferrer"><span class="research-year">${esc(p.year)}</span><div><h3>${esc(p.title)}</h3><p class="research-authors">${p.authors.map(esc).join(', ')}</p><p class="research-venue">${esc(p.venue)}</p></div>${arrowNE}<span class="sr-only"> (opens in a new tab)</span></a>`).join('')
  };
  const template = await readFile(path.join(root, 'src', 'index.html'), 'utf8');
  const html = template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => {
    if (!(key in slots)) throw new Error(`Missing template slot: ${key}`);
    return slots[key];
  });
  await writeFile(path.join(dist, 'index.html'), html);
  await writeFile(path.join(dist, '.nojekyll'), '');
  console.log(`Built dist (${c.work.length} products, ${c.research.length} publications)`);
  return dist;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
