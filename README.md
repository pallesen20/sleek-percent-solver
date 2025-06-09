
# Advanced Percentage Calculator

A professional, SEO-optimized percentage calculator with multiple calculation modes.

## Features

- **Multiple Calculator Types**: Basic percentage, percentage increase, percentage decrease, and "what percentage" calculations
- **Real-time Calculations**: Instant results as you type
- **SEO Optimized**: Structured data, meta tags, and semantic HTML
- **PWA Ready**: Service worker and manifest for offline capability
- **Responsive Design**: Works on all devices
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance Optimized**: Fast loading and smooth interactions

## Deployment Instructions

### 1. Deploy to Netlify (Recommended)

1. **Connect to Git**: 
   - Push this code to a GitHub repository
   - Connect your Netlify account to GitHub

2. **Deploy**:
   - In Netlify, click "New site from Git"
   - Select your repository
   - Build settings are automatically configured via `netlify.toml`
   - Click "Deploy site"

3. **Custom Domain**:
   - In Netlify dashboard, go to Domain settings
   - Add your custom domain (calculations.tools)
   - Update DNS records as instructed

### 2. Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### 3. Deploy to GitHub Pages

1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

## SEO Optimization Checklist

### Before Going Live:

1. **Domain References**: ✅ Updated to calculations.tools

2. **Add Favicon Files**:
   - Generate favicons at [favicon.io](https://favicon.io)
   - Add the generated files to your root directory
   - Update favicon references in `index.html`

3. **Create Social Media Images**:
   - Create a preview image (1200x630px) for social media sharing
   - Update the `og:image` and `twitter:image` meta tags

4. **Google Analytics** (Optional):
   - Add Google Analytics tracking code to `index.html`
   - Update the `trackCalculatorUsage` function in `script.js`

5. **Google Search Console**:
   - Verify your domain in Google Search Console
   - Submit your sitemap

### Content Management

To update content:

1. **Calculator Types**: Edit the `calculatorConfigs` object in `script.js`
2. **SEO Content**: Edit the "How to Use" section in `index.html`
3. **Features**: Update the features section in `index.html`
4. **Styling**: Modify `styles.css` for design changes

## Performance Features

- **Lazy Loading**: Images and non-critical resources
- **Service Worker**: Caching for offline functionality
- **Optimized CSS**: Minimal and efficient styling
- **Debounced Calculations**: Prevents excessive computation
- **Responsive Images**: Proper sizing for different devices

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## License

MIT License - feel free to use for personal or commercial projects.
