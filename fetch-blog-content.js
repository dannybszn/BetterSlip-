import { BlogClient } from 'seobot';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Blog client setup
const SEOBOT_API_KEY = process.env.SEOBOT_API_KEY || '4a42e2c0-863d-4376-b4ed-46296427363d';
const client = new BlogClient(SEOBOT_API_KEY);

// Helper function to create a full HTML page
function createFullHtmlPage(article) {
  const keywords = article.metaKeywords ? 
    article.metaKeywords.split(',').map(k => k.trim()).filter(k => k.length > 0) : 
    [];

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.headline} | BetterSlip Blog</title>
    <meta name="description" content="${article.metaDescription || ''}">
    ${keywords.length > 0 ? `<meta name="keywords" content="${keywords.join(', ')}">` : ''}
    <meta name="author" content="BetterSlip Team">
    <meta property="og:title" content="${article.headline}">
    <meta property="og:description" content="${article.metaDescription || ''}">
    ${article.image ? `<meta property="og:image" content="${article.image}">` : ''}
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://betterslip.com/blog/${article.slug}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${article.headline}">
    <meta name="twitter:description" content="${article.metaDescription || ''}">
    ${article.image ? `<meta name="twitter:image" content="${article.image}">` : ''}
    
    <link rel="canonical" href="https://betterslip.com/blog/${article.slug}">
    
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        article {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #1a1a1a;
            margin-bottom: 20px;
            line-height: 1.3;
        }
        .meta {
            color: #666;
            font-size: 14px;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .meta span {
            margin-right: 20px;
        }
        .featured-image {
            width: 100%;
            height: auto;
            margin-bottom: 30px;
            border-radius: 4px;
        }
        .content {
            font-size: 18px;
            line-height: 1.8;
        }
        .content h2 {
            margin-top: 30px;
            margin-bottom: 15px;
            color: #2c2c2c;
        }
        .content h3 {
            margin-top: 25px;
            margin-bottom: 12px;
            color: #3c3c3c;
        }
        .content p {
            margin-bottom: 20px;
        }
        .content ul, .content ol {
            margin-bottom: 20px;
            padding-left: 30px;
        }
        .content li {
            margin-bottom: 10px;
        }
        .content blockquote {
            border-left: 4px solid #C5B358;
            padding-left: 20px;
            margin: 20px 0;
            font-style: italic;
            color: #666;
        }
        .content table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .content th, .content td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        .content th {
            background-color: #f5f5f5;
            font-weight: bold;
        }
        .content code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: monospace;
            font-size: 0.9em;
        }
        .content pre {
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            margin: 20px 0;
        }
        .content pre code {
            background: none;
            padding: 0;
        }
        .content a {
            color: #C5B358;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s;
        }
        .content a:hover {
            border-bottom-color: #C5B358;
        }
        .tags {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        .tag {
            display: inline-block;
            background-color: #f0f0f0;
            color: #666;
            padding: 5px 12px;
            margin-right: 10px;
            margin-bottom: 10px;
            border-radius: 20px;
            font-size: 14px;
            text-decoration: none;
        }
        .tag:hover {
            background-color: #e0e0e0;
        }
        .category {
            display: inline-block;
            color: #C5B358;
            font-weight: 500;
            margin-bottom: 10px;
        }
        .footer-cta {
            margin-top: 40px;
            padding: 30px;
            background-color: #f8f8f8;
            border-radius: 8px;
            text-align: center;
        }
        .footer-cta h3 {
            margin-bottom: 15px;
            color: #1a1a1a;
        }
        .footer-cta p {
            margin-bottom: 20px;
            color: #666;
        }
        .cta-button {
            display: inline-block;
            background-color: #C5B358;
            color: white;
            padding: 12px 30px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        .cta-button:hover {
            background-color: #b3a147;
        }
    </style>
</head>
<body>
    <article>
        ${article.category ? `<div class="category">Category: ${article.category.title}</div>` : ''}
        <h1>${article.headline}</h1>
        <div class="meta">
            <span>By BetterSlip Team</span>
            <span>${new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>${article.readingTime || 5} min read</span>
        </div>
        ${article.image ? `<img src="${article.image}" alt="${article.headline}" class="featured-image">` : ''}
        <div class="content">
            ${article.html || `<p>${article.metaDescription}</p>`}
        </div>
        ${article.tags && article.tags.length > 0 ? `
        <div class="tags">
            ${article.tags.map(tag => `<a href="https://betterslip.com/blog/tag/${tag.slug}" class="tag">#${tag.title}</a>`).join('')}
        </div>
        ` : ''}
        <div class="footer-cta">
            <h3>Start Winning More with BetterSlip</h3>
            <p>Join thousands of smart bettors using our AI-powered tools to find profitable opportunities.</p>
            <a href="https://betterslip.com/register" class="cta-button">Get Started Free</a>
        </div>
    </article>
    
    <script type="application/ld+json">
    ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.headline,
        "description": article.metaDescription || '',
        "image": article.image || '',
        "datePublished": article.publishedAt || '',
        "dateModified": article.updatedAt || article.publishedAt || '',
        "author": {
            "@type": "Organization",
            "name": "BetterSlip Team"
        },
        "publisher": {
            "@type": "Organization",
            "name": "BetterSlip",
            "logo": {
                "@type": "ImageObject",
                "url": "https://betterslip.com/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://betterslip.com/blog/${article.slug}`
        },
        "keywords": keywords.join(', ')
    })}
    </script>
</body>
</html>`;
}

// Function to sanitize filename
function sanitizeFilename(slug) {
  return slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
}

// Main function to fetch and save all blog posts
async function fetchAndSaveAllBlogPosts() {
  console.log('Starting blog content fetch...');
  
  try {
    // Get all articles
    const allArticles = [];
    let page = 0;
    const limit = 100;
    let hasMore = true;
    
    while (hasMore) {
      try {
        console.log(`Fetching page ${page + 1}...`);
        const response = await client.getArticles(page, limit);
        const articles = response.articles || [];
        
        if (articles && articles.length > 0) {
          console.log(`Found ${articles.length} articles on page ${page + 1}`);
          allArticles.push(...articles);
          page++;
        } else {
          console.log('No more articles found');
          hasMore = false;
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        hasMore = false;
      }
    }
    
    console.log(`Total articles found: ${allArticles.length}`);
    
    // Create blog directory if it doesn't exist
    const blogDir = path.join(__dirname, 'blog');
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }
    
    // Process each article
    for (const article of allArticles) {
      try {
        console.log(`Processing: ${article.headline}`);
        
        // Fetch full article content
        const fullArticle = await client.getArticle(article.slug);
        
        if (fullArticle) {
          // Create HTML content
          const htmlContent = createFullHtmlPage(fullArticle);
          
          // Save to file
          const filename = `${sanitizeFilename(fullArticle.slug)}.html`;
          const filepath = path.join(blogDir, filename);
          
          fs.writeFileSync(filepath, htmlContent, 'utf8');
          console.log(`✓ Saved: ${filename}`);
        }
      } catch (err) {
        console.error(`Error processing article ${article.slug}:`, err);
      }
    }
    
    // Create an index file with all blog posts
    const indexHtml = createBlogIndexHtml(allArticles);
    fs.writeFileSync(path.join(blogDir, 'index.html'), indexHtml, 'utf8');
    console.log('✓ Created blog index.html');
    
    console.log('\nBlog content fetch completed!');
    console.log(`Total articles saved: ${allArticles.length}`);
    
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

// Function to create blog index HTML
function createBlogIndexHtml(articles) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BetterSlip Blog - Sports Betting Technology & Analysis</title>
    <meta name="description" content="Expert insights on sports betting technology, odds comparison, arbitrage detection, and betting strategies from the BetterSlip team.">
    <meta name="keywords" content="sports betting, betting technology, odds comparison, arbitrage betting, positive EV, betting analysis, BetterSlip">
    
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #1a1a1a;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            font-size: 20px;
            margin-bottom: 40px;
        }
        .articles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 30px;
        }
        .article-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        .article-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .article-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        .article-content {
            padding: 20px;
        }
        .article-meta {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .article-title {
            color: #1a1a1a;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
            line-height: 1.3;
        }
        .article-excerpt {
            color: #666;
            font-size: 16px;
            line-height: 1.5;
        }
        .footer-section {
            margin-top: 60px;
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>BetterSlip Blog</h1>
    <p class="subtitle">In-depth articles about sports betting technology, odds comparison, and betting analysis</p>
    
    <div class="articles-grid">
        ${articles.map(article => `
        <a href="${sanitizeFilename(article.slug)}.html" class="article-card">
            ${article.image ? `<img src="${article.image}" alt="${article.headline}" class="article-image">` : ''}
            <div class="article-content">
                <div class="article-meta">
                    ${new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    • ${article.readingTime || 5} min read
                </div>
                <h2 class="article-title">${article.headline}</h2>
                <p class="article-excerpt">${article.metaDescription || ''}</p>
            </div>
        </a>
        `).join('')}
    </div>
    
    <div class="footer-section">
        <h2>Ready to Start Winning?</h2>
        <p>Join BetterSlip and use our AI-powered tools to find profitable betting opportunities.</p>
        <a href="https://betterslip.com" style="display: inline-block; background-color: #C5B358; color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: 500; margin-top: 20px;">Visit BetterSlip.com</a>
    </div>
</body>
</html>`;
}

// Run the script
fetchAndSaveAllBlogPosts();