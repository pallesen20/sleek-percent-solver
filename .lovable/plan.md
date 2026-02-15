

# Add Dynamic Breadcrumbs to All Pages

## Approach
Create a single dynamic breadcrumb system inside `header.js` that automatically generates breadcrumbs based on the current URL path. This means every existing and future page gets breadcrumbs with zero manual work -- no per-page changes needed.

## How It Works
- The script reads `window.location.pathname` and splits it into segments
- It builds a breadcrumb trail: **Home > [Parent] > Current Page**
- It skips rendering on the homepage (`/` or `/index.html`)
- It converts URL slugs to readable names (e.g., `weight-converter` becomes `Weight Converter`, `compare-text` becomes `Compare Text`)
- For nested paths like `/conversion/currency-converter`, it produces: **Home > Conversion > Currency Converter**

## Visual Design
- Placed directly below the header, top-left aligned within the max-width container
- Small, subtle text using the site's muted color palette (`#94a3b8` for links, white for current page)
- Chevron separators (`>`) between items
- Links have hover underline effect
- Compact padding so it doesn't take up too much space
- Mobile responsive: smaller font size, wraps naturally

## Schema Markup
- Injects a `BreadcrumbList` JSON-LD `<script>` tag into the `<head>` automatically
- Each breadcrumb item gets proper `ListItem` position, name, and URL
- The last item (current page) has no URL per Google's recommendation

## Files to Change

### 1. `header.js`
Add a `loadBreadcrumbs()` function that runs after `loadHeader()`:
- Checks if current path is homepage; if so, exits
- Parses URL path into segments
- Builds breadcrumb HTML with proper styling
- Inserts it after the `<header>` element
- Injects BreadcrumbList JSON-LD schema into `<head>`

### 2. `base.css`
Add breadcrumb styles:
- `.breadcrumb-nav` container with max-width matching site layout
- `.breadcrumb-list` as inline flex with gap
- `.breadcrumb-item` and `.breadcrumb-separator` styled subtly
- Mobile media query for smaller text

## Example Output

For `/conversion/currency-converter`:
```
Home  >  Conversion  >  Currency Converter
```

For `/week-number`:
```
Home  >  Week Number
```

For `/about-us`:
```
Home  >  About Us
```

## Technical Notes
- A name mapping object handles special cases (e.g., `about-us` to `About Us`, `compare-text` to `Compare Text`)
- Fallback: capitalizes each word from the slug if no mapping exists
- The breadcrumb nav element is inserted immediately after the header using `insertAdjacentHTML('afterend', ...)`
- JSON-LD is appended as a script tag to `document.head`

