import http from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { build, root } from './build.mjs';

const dist=await build();
const port=Number(process.env.PORT || 4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.pdf':'application/pdf'};
let rebuild=Promise.resolve();
let timer;
const sourceSignature=async()=>{
  const hash=createHash('sha256');
  const add=async(file)=>{
    const info=await stat(file);
    if(info.isDirectory())for(const name of (await readdir(file)).sort())await add(path.join(file,name));
    else {hash.update(path.relative(root,file));hash.update(await readFile(file));}
  };
  for(const name of ['content.mjs','src','public'])await add(path.join(root,name));
  return hash.digest('hex');
};
let signature=await sourceSignature();
// Some filesystem events report metadata changes. Rebuild only for source changes.
const queueBuild=()=>{clearTimeout(timer);timer=setTimeout(()=>{
  rebuild=rebuild.then(async()=>{
    const next=await sourceSignature();
    if(next!==signature){await build();signature=next;}
  }).catch(error=>console.error(error.message));
},80);};
const watchers=[watch(path.join(root,'src'),{recursive:true},queueBuild),watch(path.join(root,'public'),{recursive:true},queueBuild),watch(path.join(root,'content.mjs'),queueBuild)];
const server=http.createServer(async(req,res)=>{
  try {
    await rebuild;
    const url=new URL(req.url,'http://localhost');
    let name=decodeURIComponent(url.pathname);
    if(name.endsWith('/')) name+='index.html';
    const file=path.resolve(dist,`.${name}`);
    if(!file.startsWith(`${dist}${path.sep}`)) {res.writeHead(403);res.end('Forbidden');return;}
    const info=await stat(file);
    if(!info.isFile()) throw new Error('Not a file');
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    if(req.method==='HEAD'){res.end();return;}
    res.end(await readFile(file));
  } catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Page not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
server.on('error',error=>{console.error(error.message);for(const watcher of watchers)watcher.close();process.exitCode=1;});
const close=()=>{for(const watcher of watchers)watcher.close();server.close(()=>process.exit(0));};
process.on('SIGINT',close);process.on('SIGTERM',close);
