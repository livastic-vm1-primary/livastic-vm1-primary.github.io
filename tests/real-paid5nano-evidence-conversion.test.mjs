import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const get=file=>readFileSync(new URL('../'+file,import.meta.url),'utf8');
const page=get('case-studies/pursekeeper-nano-lock-bounty-5xno.html');
const root=get('index.html');
const map=get('sitemap.xml');
const bot=get('robots.txt');
const llms=get('llms.txt');
const title='https://livastic-vm1-primary.github.io/case-studies/pursekeeper-nano-lock-bounty-5xno.html';
const paymentHash='9D8609A7133DB7C03235ED072D2995465FE6296D48528F22680AC5B12AF147CE';
const payee='nano_3dnw8cnibw5sui8ejpabuosxrkdnmhaxeaf97fmux5jyhioboag18fbngupy';

test('published case-study is a static canonical public page, original owner, accessible on mobiles',()=>{
 assert.match(page,/<!doctype html>/);
 assert.ok(page.includes('<meta name="viewport"'));
 assert.ok(page.includes('<main id="main"'));
 assert.ok(page.includes('<h1>'));
 assert.ok(page.includes('rel="canonical" href="'+title+'"'));
 assert.ok(page.includes('href="../main.css"'));
 assert.ok(page.includes('href="#main"'));
 assert.match(page,/AI-assisted/);
 assert.match(page,/one human economic owner/);
 assert.doesNotMatch(page,/<form\b|<input\b|<script\b|<iframe\b|onload=|onclick=/i);
});
test('record is an actual sponsor-merged original PR and exact one independent payment, not an invented review',()=>{
 assert.ok(page.includes('https://github.com/pursekeeper/api/pull/94'));
 assert.ok(page.includes('ae7b5eafdac6f99852af206832be59f82df757c6'));
 assert.match(page,/5 XNO/);
 assert.match(page,/entry <strong>441<\/strong>/);
 assert.ok(page.includes('2026'));
 assert.ok(page.includes(paymentHash));
 assert.ok(page.includes(payee));
 assert.ok(page.includes('https://pursekeeper.dev/log'));
});
test('asset accounting explicitly separates new independent bounty from wallet spendability and USD',()=>{
 assert.match(page,/5 XNO receivable/);
 assert.match(page,/0 XNO spendable/);
 assert.match(page,/0 XNO available|zero available raw units/);
 assert.match(page,/future recipient RECEIVE/);
 assert.match(page,/does not produce a second paid bounty/);
 assert.match(page,/not<\/strong> this earned 5 XNO bounty/);
 assert.match(page,/not a USD conversion, a bank payout or a second USDC transaction/);
 assert.doesNotMatch(page,/five already-spendable XNO|5 USDC paid for bug fix|bank cash received/);
});
test('engineer can reproduce actual unsafe race and guard decision without any wallet or RPC',()=>{
 for(const s of ['H</strong> is the old, dead process','B</strong> compares','C</strong>','read–compare–unlink',
  'reaper','exclusive','<code>wx</code>','unsigned','exit status <strong>5</strong>',
  'no remote calls','no payment from a wallet','PID reuse','cross-machine']){
  if(s==='cross-machine')continue; // explicitly written same-host limitation below
  assert.ok(page.includes(s),s);
 }
 assert.match(page,/cross-host lock|distributed storage/);
 assert.match(page,/Node.js 24.20.0/);
 assert.match(page,/187 tests: 182 passed, 0 failed and 5 pre-existing environment skips/);
 assert.match(page,/32 separate Node 24 mock child processes: 32 passed, 0 failed/);
 assert.ok(page.includes('https://github.com/pursekeeper/api/issues/92'));
 assert.ok(page.includes('https://github.com/pursekeeper/api/pull/94/files'));
});
test('paid-bounty case-study invites optional independently authorized buyer only, never automatic charges or secrets',()=>{
 const links=[...page.matchAll(/href="(mailto:[^"]+)"/g)].map(x=>x[1].replaceAll('&amp;','&'));
 assert.equal(links.length,1);
 const uri=new URL(links[0]);
 assert.equal(uri.protocol,'mailto:');
 assert.equal(uri.pathname,'onecursor1@gmail.com');
 assert.match(uri.searchParams.get('subject'),/payment-client or CSV bug/);
 assert.match(uri.searchParams.get('body'),/fictional inputs only/);
 assert.match(uri.searchParams.get('body'),/No funds or private keys are requested/);
 assert.match(page,/opens email draft only/);
 assert.match(page,/not<\/strong> this earned 5 XNO bounty/);
 assert.match(page,/No communication is sent merely by opening a mailto link/);
 assert.match(page,/Do not send wallet seeds, API keys/);
 assert.ok(page.includes('https://hashn.com/store/'));
});
test('actually promoted self-owned root is truthful and contains no false testimonials',()=>{
 assert.ok(root.includes('href="/case-studies/pursekeeper-nano-lock-bounty-5xno.html"'));
 assert.match(root,/5 XNO receivable \/ 0 XNO spendable/);
 assert.match(root,/not<\/em> a new USDC customer/);
 assert.match(root,/View independent sponsor's merged PR/);
 assert.doesNotMatch(root,/thousands of paying users|guaranteed security review|bank fiat received/);
});
test('crawler sitemap links new original article exactly once and excludes sensitive credentials',()=>{
 assert.equal((map.match(/<loc>/g)||[]).length,2);
 assert.equal((map.match(/pursekeeper-nano-lock-bounty-5xno.html/g)||[]).length,1);
 assert.ok(map.includes(title));
 assert.ok(bot.includes('Sitemap: https://livastic-vm1-primary.github.io/sitemap_index.xml'));
 assert.ok(llms.includes(title));
 assert.match(llms,/receivable not spendable/);
 for(const item of [page,root,map,llms]){
  assert.doesNotMatch(item,/privateSeed|privateKey|scrypt_password|keystore\.json|local-key|api_token|BEGIN PRIVATE KEY/);
 }
});
test('only this one original Nano grant is attributed in public, not doubled on a later receive',()=>{
 assert.equal((page.match(new RegExp(paymentHash,'g'))||[]).length,1);
 assert.match(page,/one completed paid bounty/);
 assert.match(page,/future recipient RECEIVE of this same hash|A future recipient RECEIVE of this <em>same hash<\/em>/);
 assert.doesNotMatch(page,/we have received 5 XNO into available balance|confirmed five spent Nano/);
});
