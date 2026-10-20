import test from'node:test';
import assert from'node:assert/strict';
import {readFileSync} from'node:fs';
const read=f=>readFileSync(new URL('../'+f,import.meta.url),'utf8');
const key='c4a1a4fac4d5fafce82f0f21d45095bb';
test('explicit host-root IndexNow key is the SAME already public valid 32-hex key on the one original host',()=>{
 assert.match(key,/^[0-9a-f]{32}$/);
 assert.equal(read(key+'.txt').trim(),key);
 assert.equal(read(key+'.txt').trim().length,32);
});
test('true root sitemap includes actual published source-linked paid Nano 5XNO case and correct domain',()=>{
 const map=read('sitemap.xml');
 const link='https://livastic-vm1-primary.github.io/case-studies/pursekeeper-nano-lock-bounty-5xno.html';
 assert.equal(map.split(link).length,2);
 assert.match(read('robots.txt'),/Sitemap: https:\/\/livastic-vm1-primary.github.io\/sitemap_index.xml/);
 assert.match(read('sitemap_index.xml'),/paperpilot-tools\/sitemap.xml/);
});
test('IndexNow is discovery only, no fake Google indexing, buyer traffic or claimed payments',()=>{
 const readme=read('README.md');
 assert.match(readme,/IndexNow host-root verification/);
 assert.match(readme,/not a promise of Google indexing, Bing indexing,\s+site traffic, bought services or additional income/);
 assert.match(readme,/Pursekeeper's one already booked independent Nano bounty/i);
});
