import fs from "node:fs";
import vm from "node:vm";

const ROOT = new URL("..", import.meta.url).pathname;
const html = fs.readFileSync(ROOT + "/index.html", "utf8");

// --- extract the <style> block (font-face + .article typography) ---
const STYLE = html.slice(html.indexOf("<style>") + 7, html.indexOf("</style>")).trim();

// --- extract ARTICLES and UI object literals via vm ---
const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
let m, block = null;
while ((m = re.exec(html))) { if (m[1].includes("const ARTICLES=")) { block = m[1]; break; } }
function grabLiteral(src, decl, endToken) {
  const s = src.indexOf(decl);
  const e = src.indexOf(endToken, s);
  return src.slice(s, e + endToken.length).replace(decl, "__OUT=");
}
const ctx = {}; vm.createContext(ctx);
vm.runInContext(grabLiteral(block, "const ARTICLES=", "\n];"), ctx);
const ARTICLES = ctx.__OUT;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const stripTags = (s) => String(s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
function descOf(a, et) {
  const base = et.who || et.question || stripTags(et.body);
  const t = stripTags(base);
  return t.length > 158 ? t.slice(0, 155).trimEnd() + "…" : t;
}
// rewrite in-app links so static pages link to each other / back into the SPA
function rewrite(body) {
  return body
    .replace(/href="#\/spravochnik\/([a-z0-9-]+)"/g, 'href="$1.html"')
    .replace(/href="#(support|involved|guide|top|app)"/g, 'href="/#$1"');
}

const ART_DISCL = "Teave on üldise iseloomuga ega asenda arsti, juristi ega sotsiaaltöötaja konsultatsiooni. Kontrollige ajakohaseid tingimusi ametlikel veebisaitidel.";
const L = { home: "Avaleht", guide: "Teatmik", who: "Kellele see aitab", q: "Vastab küsimusele", next: "Järgmine samm" };

function page(a) {
  const et = a.tr.et;
  const title = et.title, who = et.who, question = et.question, next = et.next;
  const body = rewrite(et.body);
  const desc = descOf(a, et);
  const url = `https://autismabroad.org/${a.slug}.html`;
  const metaBox = (who || question) ? `
    <div class="mt-6 grid gap-3 rounded-2xl bg-teal-50 p-5 sm:grid-cols-2">
      <div><div class="text-xs font-semibold uppercase tracking-wide text-teal-600">${esc(L.who)}</div><div class="mt-1 text-[15px] text-ink">${esc(who)}</div></div>
      <div><div class="text-xs font-semibold uppercase tracking-wide text-teal-600">${esc(L.q)}</div><div class="mt-1 text-[15px] text-ink">${esc(question)}</div></div>
    </div>` : "";
  const discl = a.noDiscl ? "" : `
    <div class="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-[13px] text-amber-900"><span>ⓘ</span><span>${esc(ART_DISCL)}</span></div>`;
  const nextBox = next ? `
    <div class="mt-10 rounded-2xl border border-teal-100 bg-teal-50 p-6"><div class="text-sm font-semibold text-teal-700">${esc(L.next)}</div><div class="mt-1 text-[15px] text-muted">${esc(next)}</div></div>` : "";
  return `<!doctype html>
<html lang="et">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)} · Autism Families Abroad</title>
<meta name="description" content="${esc(desc)}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="https://autismabroad.org/og-cover.png" />
<meta property="og:site_name" content="Autism Families Abroad" />
<link rel="stylesheet" href="styles.css" />
<style>${STYLE}</style>
</head>
<body style="background:#F7F3ED" class="text-ink">
<header class="border-b border-teal-100 bg-white">
  <div class="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
    <a href="/" class="flex items-center gap-2 text-lg font-bold text-ink no-underline"><span class="grid h-8 w-8 place-items-center rounded-full bg-teal-700 text-white">∞</span>Autism Families Abroad</a>
    <a href="/#guide" class="text-sm font-semibold text-teal-700 hover:text-teal-800 no-underline">${esc(L.guide)} →</a>
  </div>
</header>
<main class="mx-auto max-w-3xl px-5 py-12 sm:px-8">
  <nav class="flex flex-wrap items-center gap-2 text-sm text-muted">
    <a href="/" class="hover:text-teal-700 no-underline">${esc(L.home)}</a><span class="text-teal-300">›</span>
    <a href="/#guide" class="font-medium text-teal-700 hover:text-teal-800 no-underline">${esc(L.guide)}</a>
  </nav>
  <h1 class="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">${esc(title)}</h1>${metaBox}${discl}
  <article class="article mt-6">${body}</article>${nextBox}
  <div class="mt-8 rounded-2xl border border-teal-100 bg-white p-5 text-[14px] text-muted">See lehekülg on saadaval ka vene, ukraina ja inglise keeles — <a class="font-semibold text-teal-700" href="/#/spravochnik/${a.slug}">ava interaktiivses teatmikus</a>.</div>
</main>
<footer class="bg-ink py-10 text-white">
  <div class="mx-auto max-w-3xl px-5 text-[13px] leading-relaxed text-teal-300/80 sm:px-8">
    <p class="text-base font-bold text-white">Autism Families Abroad</p>
    <p class="mt-2">MTÜ Autism Families Abroad · Reg. kood 80675628 · Tallinn, Eesti</p>
    <p class="mt-1"><a class="hover:text-white" href="mailto:hello@autismabroad.org">hello@autismabroad.org</a> · <a class="hover:text-white" href="/konfidencialnost.html">Privaatsus</a> · <a class="hover:text-white" href="/kontakty.html">Kontaktid</a></p>
    <p class="mt-2 max-w-xl">MTÜ Autism Families Abroad on Eestis registreeritud mittetulundusühing. Pakume tasuta teavet ega ole meditsiini- ega tervishoiuteenuse osutaja.</p>
  </div>
</footer>
</body>
</html>
`;
}

let count = 0;
const urls = ["https://autismabroad.org/"];
for (const a of ARTICLES) {
  fs.writeFileSync(`${ROOT}/${a.slug}.html`, page(a));
  urls.push(`https://autismabroad.org/${a.slug}.html`);
  count++;
}

// --- sitemap with all static pages ---
const today = "2026-10-02";
const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u, i) => `  <url>
    <loc>${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${i === 0 ? "weekly" : "monthly"}</changefreq>
    <priority>${i === 0 ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(`${ROOT}/sitemap.xml`, sm);

console.log(`generated ${count} article pages + sitemap (${urls.length} urls)`);
