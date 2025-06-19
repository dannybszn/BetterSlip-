import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseURL = 'https://docs.betterslip.com';
const currentDate = new Date().toISOString().split('T')[0];

// Define all documentation pages (excluding blog)
const pages = [
    {
        url: '/',
        priority: '1.0',
        changefreq: 'weekly'
    },
    {
        url: '/documentation/',
        priority: '0.9',
        changefreq: 'weekly'
    },
    // Advanced Features
    {
        url: '/documentation/alerts.html',
        priority: '0.8',
        changefreq: 'monthly'
    },
    {
        url: '/documentation/filters.html',
        priority: '0.8',
        changefreq: 'monthly'
    },
    {
        url: '/documentation/analytics.html',
        priority: '0.8',
        changefreq: 'monthly'
    },
    {
        url: '/documentation/mobile-app.html',
        priority: '0.8',
        changefreq: 'monthly'
    },
    // Core Tools
    {
        url: '/documentation/tools/arbitrage.html',
        priority: '0.9',
        changefreq: 'monthly'
    },
    {
        url: '/documentation/tools/positive-ev.html',
        priority: '0.9',
        changefreq: 'monthly'
    },
    {
        url: '/documentation/tools/best-odds.html',
        priority: '0.8',
        changefreq: 'monthly'
    },
    {
        url: '/documentation/tools/ai-parlay.html',
        priority: '0.9',
        changefreq: 'monthly'
    },
    {
        url: '/documentation/tools/low-holds.html',
        priority: '0.7',
        changefreq: 'monthly'
    },
    {
        url: '/documentation/tools/middles.html',
        priority: '0.7',
        changefreq: 'monthly'
    },
    // Tools & Calculators
    {
        url: '/documentation/tools/calculators.html',
        priority: '0.7',
        changefreq: 'monthly'
    },
    {
        url: '/documentation/tools/bet-tracker.html',
        priority: '0.7',
        changefreq: 'monthly'
    },
    {
        url: '/documentation/tools/promo-converter.html',
        priority: '0.6',
        changefreq: 'monthly'
    },
    {
        url: '/documentation/tools/parlay-shopper.html',
        priority: '0.6',
        changefreq: 'monthly'
    }
];

function generateSitemap() {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    pages.forEach(page => {
        sitemap += `  <url>
    <loc>${baseURL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    sitemap += `</urlset>`;

    // Write sitemap to root directory
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Generated ${pages.length} URLs`);
    console.log('🗂️ Excluded: /blog/ directory (hosted on main site)');
}

// Run the generator
generateSitemap();