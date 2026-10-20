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
test('root sitemap lists only canonical actual live root and original paid Nano bounty case study',()=>{
 assert.match(sitemap,/<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
 assert.equal((sitemap.match(/<loc>/g)||[]).length,2);
 assert.ok(sitemap.includes('https://livastic-vm1-primary.github.io/</loc>'));
 assert.ok(sitemap.includes('https://livastic-vm1-primary.github.io/case-studies/pursekeeper-nano-lock-bounty-5xno.html</loc>'));
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

test('Koinly-specific free help actually reaches an existing current distinct tool and separate checker',()=>{
  assert.match(page,/Koinly CSV column mapping/);
  assert.match(page,/href="\/paperpilot-tools\/koinly-column-mapper.html"/);
  assert.match(page,/href="https:\/\/livastic-vm3-primary-tmp-260920.github.io\/crypto-csv-rescue\/koinly-preflight\/"/);
  assert.match(page,/not.*proof of Koinly acceptance or tax correctness/);
  assert.match(page,/supported export/);
});
test('primary customer quote action is a user-owned email DRAFT, not a form payment or telemetry event',()=>{
  const link=page.match(/href="(mailto:onecursor1@gmail.com\?[^"]+)"/)?.[1];
  assert.ok(link);
  const u=new URL(link);
  assert.equal(u.protocol,'mailto:');
  assert.equal(u.pathname,'onecursor1@gmail.com');
  assert.match(u.searchParams.get('subject'),/Crypto CSV Rescue or USDC invoice pilot/);
  const body=u.searchParams.get('body');
  assert.match(body,/Public column headers or problem category/);
  assert.match(body,/no-payment enquiry/);
  assert.doesNotMatch(body,/0x[a-f0-9]{40}|private key|recovery phrase/i);
  assert.match(page,/nothing is transmitted until you choose Send/);
  assert.match(page,/Optional third-party-consent form/);
  assert.match(page,/may require an anti-spam check/);
  assert.match(page,/not a fixed checkout/);
});
test('crawler root index retains correctly scoped canonical, sitemap and no fake payment assertions',()=>{
  assert.match(page,/href="https:\/\/github.com\/livastic-vm1-primary\/paperpilot-tools"/);
  assert.doesNotMatch(page,/\b(fetch|XMLHttpRequest|localStorage|sessionStorage|window.ethereum|PAYMENT-SIGNATURE)\b/);
  assert.match(get('robots.txt'),/Sitemap: https:\/\/livastic-vm1-primary.github.io\/sitemap_index.xml/);
  assert.match(get('sitemap_index.xml'),/paperpilot-tools\/sitemap.xml/);
});
test('host-root agent guide links original distinct GET vs POST paid resources',()=>{
 const llms=get('llms.txt');
 assert.ok(llms.includes('POST https://vm5-openapi-x402.onrender.com/v1/csv-preflight'));
 assert.ok(llms.includes('GET https://vm5-openapi-x402.onrender.com/v1/csv-report'));
 assert.ok(llms.includes('GET https://vm5-openapi-x402.onrender.com/v1/ping'));
 assert.ok(llms.includes('eip155:8453'));
 assert.ok(llms.includes('0x833589fCD6eDb6E08f4C7C32D4f71b54bdA02913'));
});
test('root agent guide does not misrepresent a free HTTP402 as proof of paid buyer',()=>{
 const llms=get('llms.txt');
 assert.match(llms,/HTTP 402 indicates a payment CHALLENGE, not a successful purchase/);
 assert.match(llms,/No independent buyer-owned/);
 assert.match(llms,/produced ZERO new USDC revenue/);
 assert.match(llms,/one human economic beneficiary/i);
 assert.match(llms,/no wallet\s+signing/i);
});
test('root agent guide always links original source and free project before paid items',()=>{
 const llms=get('llms.txt');
 assert.ok(llms.indexOf('All original free tools') < llms.indexOf('Optional original ONE-owner'));
 assert.ok(llms.includes('github.com/livastic-vm1-primary/paperpilot-tools'));
 assert.ok(llms.includes('/paperpilot-tools/llms.txt'));
 assert.ok(!llms.includes('PRIVATE_KEY'));
});

test('original user root adds real 5 native Circle USDC small Koinly buyer enquiry without claiming payment',()=>{
  const slug='https://hashn.com/store/886ed287-aaca-434b-9f27-560a50bfbbb6/listings/koinly-csv-one-source-mapping-mini-review-5usdc.md';
  assert.ok(page.includes(slug));
  assert.match(page,/Optional 5 native Circle Base USDC \/ 10-row HashN manual mini-review/);
  assert.match(page,/not proof of escrow, paid client or Koinly acceptance/);
  assert.match(page,/buyer-initiated/);
  assert.match(page,/<strong>not an automatic purchase<\/strong>/);
});
test('original root agent discovery keeps the first-party 5USDC seller separate from zero buyers and larger $49 scope',()=>{
  const txt=get('llms.txt');
  assert.ok(txt.includes('https://hashn.com/store/886ed287-aaca-434b-9f27-560a50bfbbb6/listings/koinly-csv-one-source-mapping-mini-review-5usdc.md'));
  assert.match(txt,/NO confirmed independent buyers, no payment/);
  assert.match(txt,/up-to-50-row USD49 scope/);
  assert.match(txt,/free local tools/);
});
