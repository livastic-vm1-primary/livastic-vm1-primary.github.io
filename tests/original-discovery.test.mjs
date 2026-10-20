import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const get=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const page=get('index.html'),css=get('main.css'),robots=get('robots.txt');
const sitemap=get('sitemap.xml'),index=get('sitemap_index.xml');
test('root canonical is one public, static, accessible entry page',()=>{
 assert.match(page,/rel="canonical" href="https:\/\/livastic-vm1-primary\.github\.io\/"/);
 assert.match(page,/id="main"/);
 assert.match(page,/aria-label="Resources"/);
 assert.doesNotMatch(page,/<input|<form|<script|window\.ethereum/);
});
test('host robots permits crawling and lists both normal crawler-discovery sitemaps',()=>{
 assert.ok(robots.startsWith('User-agent: *\nAllow: /\n'));
 assert.ok(robots.includes('Sitemap: https://livastic-vm1-primary.github.io/sitemap_index.xml'));
 assert.ok(robots.includes('Sitemap: https://livastic-vm1-primary.github.io/paperpilot-tools/sitemap.xml'));
 assert.doesNotMatch(robots,/Disallow:/);
});
test('root sitemap only contains original canonical root homepage',()=>{
 assert.match(sitemap,/<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
 assert.equal((sitemap.match(/<loc>/g)||[]).length,1);
 assert.ok(sitemap.includes('https://livastic-vm1-primary.github.io/</loc>'));
});
test('root sitemap index references two distinct unambiguous original owner site maps',()=>{
 assert.match(index,/<sitemapindex xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
 assert.equal((index.match(/<sitemap><loc>/g)||[]).length,2);
 assert.ok(index.includes('https://livastic-vm1-primary.github.io/sitemap.xml'));
 assert.ok(index.includes('https://livastic-vm1-primary.github.io/paperpilot-tools/sitemap.xml'));
});
test('discovery page actually helps buyers find existing firstparty resources',()=>{
 for(const slug of ['services.html','contact.html','crypto-csv-rescue.html',
   'usdc-invoice-reconcile.html','x402-inspector.html','csv-usdc-checkout.html']){
  assert.ok(page.includes('/paperpilot-tools/'+slug),slug);
 }
});
test('root page discloses single owner, no unverified sales, privacy constraints',()=>{
 assert.match(page,/one human economic owner/);
 assert.match(page,/not an automatic purchase/);
 assert.match(page,/do not claim unverified paid purchases/);
 assert.match(page,/private wallet keys/);
 assert.match(page,/price check sends only fictional rows/);
});
test('layout is accessible, responsive and has no traffic-tracking pixels',()=>{
 assert.match(css,/@media\(max-width:700px\)/);
 assert.match(css,/\.grid/);
 assert.doesNotMatch(page,/googletagmanager|gtag\(|pixel|hotjar|mixpanel|segment\.io/i);
});
test('index/robot/map cannot expose secrets, codes, wallet or actual payment',()=>{
 for(const body of [robots,index,sitemap]){
  assert.doesNotMatch(body,/PAYMENT-SIGNATURE|sk_[a-z0-9]+|seedphrase|privateKey|password/);
 }
});
