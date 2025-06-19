# GitHub Pages Setup Guide for BetterSlip Public Repository

This guide will help you set up this repository for GitHub Pages hosting to create a public documentation and blog site for BetterSlip.

## Prerequisites

1. GitHub repository created and this code pushed to it
2. GitHub account with Pages permissions
3. Optional: Custom domain (docs.betterslip.com)

## Setup Steps

### 1. Push Repository to GitHub

```bash
# Navigate to the BetterSlipPublic directory
cd /path/to/BetterSlipPublic

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: BetterSlip public documentation and blog"

# Add remote origin (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/BetterSlipPublic.git

# Push to main branch
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select "GitHub Actions"
5. The workflow will automatically deploy your site

### 3. Configure Custom Domain (Optional)

If you want to use `docs.betterslip.com`:

1. In your domain DNS settings, add a CNAME record:
   - Name: `docs`
   - Value: `yourusername.github.io`

2. In GitHub repository settings > Pages:
   - Enter `docs.betterslip.com` in the Custom domain field
   - Check "Enforce HTTPS"

### 4. Site Structure

The site is organized as follows:

```
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page templates
│   ├── default.html     # Main layout
│   └── post.html        # Blog post layout
├── assets/
│   └── css/
│       └── style.css    # Main stylesheet
├── blog/
│   ├── index.md         # Blog homepage
│   └── *.html           # Individual blog posts
├── index.md             # Site homepage
├── CNAME                # Custom domain configuration
└── .github/workflows/
    └── pages.yml        # GitHub Actions deployment
```

## Features Included

### ✅ Jekyll Site Generator
- Automated builds via GitHub Actions
- SEO-optimized with jekyll-seo-tag
- Automatic sitemap generation
- RSS feed support

### ✅ Blog System
- 32+ blog posts converted to HTML
- SEO metadata for each post
- Responsive design
- Navigation between posts

### ✅ Professional Design
- Clean, modern design matching BetterSlip branding
- Mobile-responsive layout
- Fast loading times
- Optimized for search engines

### ✅ SEO Optimization
- Structured data markup
- Open Graph tags
- Twitter Card support
- Canonical URLs
- XML sitemap

## Content Management

### Adding New Blog Posts

1. Create a new HTML file in the `blog/` directory
2. Follow the existing naming convention: `slug-name.html`
3. Include proper meta tags and structured data
4. Commit and push - the site will auto-deploy

### Updating Content

1. Edit the relevant files
2. Commit and push changes
3. GitHub Actions will automatically rebuild and deploy

## SEO Benefits

This setup provides several SEO advantages:

1. **Fast Loading**: Optimized static site hosting
2. **Search Engine Friendly**: Clean URLs and proper markup
3. **Social Sharing**: Open Graph and Twitter Card support
4. **Content Discovery**: XML sitemap and RSS feeds
5. **Mobile Optimized**: Responsive design for all devices

## Analytics Setup

To add Google Analytics:

1. Get your Google Analytics tracking ID
2. Update `_config.yml`:
   ```yaml
   google_analytics: G-XXXXXXXXXX
   ```
3. Commit and push the changes

## Monitoring

After deployment, you can:

1. Check site status at: `https://yourusername.github.io/BetterSlipPublic`
2. Monitor in Google Search Console
3. Track performance in Google Analytics
4. Review GitHub Actions for deployment status

## Custom Features

### Blog Content Updates

The repository includes scripts to automatically fetch and update blog content:

- `fetch-blog-content.js` - Fetches latest posts from SEObot API
- `convert-old-blogs.js` - Converts existing TSX blog posts to HTML

These scripts are excluded from the public repository via `.gitignore`.

## Support

For issues with GitHub Pages setup:
1. Check the Actions tab for deployment errors
2. Review Jekyll build logs
3. Ensure all markdown files have proper front matter
4. Verify `_config.yml` syntax

## Next Steps

1. Push the repository to GitHub
2. Enable Pages in repository settings
3. Configure custom domain (if desired)
4. Monitor deployment in Actions tab
5. Test the live site
6. Submit to Google Search Console
7. Share the documentation site with your team

Your BetterSlip documentation and blog site will be live and automatically updating with each push to the main branch!