(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-599FWKZL');

const NAME_MAP = {
  'percentage-calculator': 'Percentage Calculator',
  'compare-text': 'Compare Text',
  'word-counter': 'Word Counter',
  'week-number': 'Week Number',
  'about-us': 'About Us',
  'privacy-policy': 'Privacy Policy',
  'length-converter': 'Length Converter',
  'weight-converter': 'Weight Converter',
  'temperature-converter': 'Temperature Converter',
  'case-converter': 'Case Converter',
  'currency-converter': 'Currency Converter',
  'conversion': 'Conversion'
};

function slugToName(slug) {
  if (NAME_MAP[slug]) return NAME_MAP[slug];
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function loadBreadcrumbs() {
  let path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  if (path === '/' || path === '') return;

  const segments = path.split('/').filter(Boolean);
  if (!segments.length) return;

  const origin = window.location.origin;
  let crumbs = [{ name: 'Home', url: origin + '/' }];
  let accumulated = '';

  segments.forEach((seg, i) => {
    accumulated += '/' + seg;
    const isLast = i === segments.length - 1;
    crumbs.push({ name: slugToName(seg), url: isLast ? null : origin + accumulated });
  });

  // Build HTML
  const items = crumbs.map((c, i) => {
    const sep = i > 0 ? '<span class="breadcrumb-separator">›</span>' : '';
    if (c.url) {
      return `${sep}<a href="${c.url}" class="breadcrumb-link">${c.name}</a>`;
    }
    return `${sep}<span class="breadcrumb-current">${c.name}</span>`;
  }).join('');

  const html = `<nav class="breadcrumb-nav" aria-label="Breadcrumb"><ol class="breadcrumb-list">${items}</ol></nav>`;
  const header = document.querySelector('header');
  if (header) header.insertAdjacentHTML('afterend', html);

  // JSON-LD
  const schemaItems = crumbs.map((c, i) => {
    const isLast = i === crumbs.length - 1;
    const itemUrl = c.url || window.location.href.split('?')[0].split('#')[0];
    return {
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": { "@type": "WebPage", "@id": itemUrl }
    };
  });
  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": schemaItems
  });
  document.head.appendChild(schema);
}

function loadHeader() {
  const headerHTML = `
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-599FWKZL"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
    <header class="header-glass">
      <div class="header-container">
        <a href="/" class="site-logo"><img src="/favicon-32x32.png" width="32" height="32"></a>
        <nav class="nav-menu">
          <a href="/percentage-calculator" class="nav-link">Percentage Calculator</a>
          <div class="nav-dropdown">
            <a href="/conversion" class="nav-link dropdown-toggle">Conversion<svg class="dropdown-arrow" viewBox="0 0 10 6">
            <path fill="currentColor" fill-rule="evenodd" d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708" clip-rule="evenodd"></path>
          </svg></a>
            <div class="dropdown-content">
              <a href="/conversion/length-converter" class="dropdown-link">Length Converter</a>
              <a href="/conversion/weight-converter" class="dropdown-link">Weight Converter</a>
              <a href="/conversion/temperature-converter" class="dropdown-link">Temperature Converter</a>
              <a href="/conversion/case-converter" class="dropdown-link">Case Converter</a>
              <a href="/conversion/currency-converter" class="dropdown-link">Currency Converter</a>
            </div>
          </div>
          <a href="/word-counter" class="nav-link">Word Counter</a>
          <a href="/compare-text" class="nav-link">Compare Text</a>
          <a href="/week-number" class="nav-link">Week Number</a>
          <a href="/about-us" class="nav-link">About</a>
        </nav>
        <div class="mobile-menu-btn">
          <span></span><span></span><span></span>
        </div>
      </div>
    </header>
  `;
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-menu');
  
  mobileBtn?.addEventListener('click', () => {
    nav?.classList.toggle('active');
  });

  loadBreadcrumbs();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeader);
} else {
  loadHeader();
}
