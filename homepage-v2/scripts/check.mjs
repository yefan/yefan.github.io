import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { build } from './build.mjs';
import content from '../content.mjs';

// Validate the deployable result, including future project additions.
const dist=await build();
const html=await readFile(path.join(dist,'index.html'),'utf8');
assert(!/\{\{[A-Z_]+\}\}/.test(html),'Unresolved template slots');
assert.equal((html.match(/<h1\b/g)||[]).length,1,'Expected exactly one primary heading');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(new Set(ids).size,ids.length,'Duplicate HTML IDs');
for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const url=match[1].replace(/&amp;/g,'&');
  if(url.startsWith('#'))assert(ids.includes(url.slice(1)),`Missing anchor ${url}`);
  else if(!/^(https?:|mailto:|data:)/.test(url)){
    assert(!url.startsWith('/'),`Root-relative URL would break a subdirectory preview: ${url}`);
    const target=path.resolve(dist,url.split(/[?#]/)[0]);
    assert(target.startsWith(`${dist}${path.sep}`),`Asset outside output: ${url}`);
    assert((await stat(target)).isFile(),`Missing local asset: ${url}`);
  }
}
assert.equal(new Set(content.work.map(p=>p.id)).size,content.work.length,'Duplicate project IDs');
for(const project of content.work){
  assert(project.name&&project.description,`Incomplete project ${project.id}`);
}
for(const paper of content.research)assert.equal(new URL(paper.href).protocol,'https:');
assert(!/\/posts?\/|Latest Posts|Behind the scenes of my first workshops/.test(html),'Blog content must not be included');
console.log('Checks passed: content, unique IDs, local assets, section anchors, project links, and static-path compatibility.');
