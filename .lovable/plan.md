

# Create Text & Code Difference Checker at /compare-text

## Overview
Build a full-featured text and code diff tool at `/compare-text` following the established site patterns (glassmorphism design, base.css reuse, SEO content with FAQ schema, footer loading). The tool will let users compare two pieces of text or code side-by-side and highlight the differences.

## Tool Functionality

### Core Diff Interface
- Two side-by-side text areas: "Original Text" (left) and "Changed Text" (right)
- Each text area includes a toolbar with 4 small icon buttons: Upload file, Download as .txt, Copy to clipboard, Clear
- Line numbers displayed in both editors
- A prominent "Find Differences" button below the editors
- Character count and line count displayed below each text area

### Diff Algorithm
- Implement a line-by-line diff using a JavaScript Longest Common Subsequence (LCS) algorithm directly in the page (no external libraries needed)
- Color-coded output: red/pink for removed lines, green for added lines, grey for unchanged context lines
- Display line numbers in the diff output

### Diff Output Section
- Unified diff view showing merged results with additions/removals color-coded
- Side-by-side diff view as an alternative toggle
- Stats summary: lines added, lines removed, lines unchanged
- A "Copy Diff" button to copy the raw diff output
- A toggle to switch between "Unified" and "Side-by-Side" views

### Additional UX Features
- "Swap" button to swap original and changed text
- "Sample" button to load example text so users can try the tool immediately
- Fully responsive: on mobile, the two editors stack vertically

## Page Structure (following weight-converter.html pattern)

1. **Head**: meta tags, OG tags, canonical URL (`/compare-text`), base.css, tailwindcss CDN, header.js
2. **Hero section**: Title "Text & Code Difference Checker" with subtitle
3. **Diff tool container**: The main glassmorphism calculator-container with the two editors and output
4. **SEO content** (`div.seo-container`): Detailed content targeting the provided keywords, with examples of use cases
5. **FAQ section** inside seo-container: 10+ relevant FAQs
6. **JSON-LD schema**: WebApplication + FAQPage structured data
7. **Footer**: loaded via fetch('/footer.html')

## SEO Content Sections (inside seo-container)
- "What is a Text Difference Checker?" (targeting: online difference checker, text difference checker)
- "How to Compare Text Online" with step-by-step (targeting: compare text online)
- "Use Cases for Text Comparison" with examples: proofreading, code review, legal docs, versioning (targeting: text comparison tool, code difference tool)
- "How the Diff Algorithm Works" (targeting: find differences between texts)
- "Comparing Files Online" (targeting: file comparison online, compare files online)
- "Why Use Our Free Difference Tool" (targeting: free difference tool, difference checker tool)

## FAQ Topics (with JSON-LD FAQPage schema)
1. What is a difference checker?
2. How do I compare two texts online?
3. Can I compare code with this tool?
4. Is this text comparison tool free?
5. How does the diff algorithm work?
6. Can I upload files to compare?
7. What file formats are supported?
8. Is my data private when using this tool?
9. Can I download the comparison results?
10. What is the maximum text length supported?
11. What is a unified diff vs side-by-side diff?
12. Can I use this tool on mobile?

## Files to Update

### 1. Create `/compare-text.html` (new file)
The main page with all functionality described above.

### 2. Update `header.js`
Add "Text Compare" link to the navigation menu (as a top-level nav link, not under Conversion dropdown).

### 3. Update `index.html`
Add a "Text & Code Diff Checker" card to the "Our Tools" grid section.

### 4. Update `sitemap.xml`
Add `https://calculations.tools/compare-text` entry.

### 5. Update `llms.txt`
Add the new page description to the Pages section.

## Technical Details

### Diff Algorithm (pure JavaScript, no dependencies)
- Line-based LCS diff implementation
- Split both inputs by newline
- Compute the LCS matrix to identify matching, added, and removed lines
- Render results with line numbers and color coding

### File Upload/Download
- Upload: use an invisible `<input type="file">` that reads `.txt`, `.js`, `.py`, `.html`, `.css`, `.json`, `.xml`, `.md`, `.csv` files via FileReader API
- Download: create a Blob and trigger download as `.txt`
- Copy: use `navigator.clipboard.writeText()`

### Styling
- Reuse base.css classes: `seo-container`, `calculator-container`, `glass` effects, `main-title`, `subtitle`, footer styles
- Custom styles scoped within the page's `<style>` block for diff-specific elements (diff line highlighting, editor layout, toolbar buttons)
- Mobile responsive with stacked editors below 768px

