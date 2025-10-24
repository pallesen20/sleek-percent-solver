(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-599FWKZL');
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
            <a href="#" class="nav-link dropdown-toggle">Conversion<svg class="dropdown-arrow" viewBox="0 0 10 6">
            <path fill="currentColor" fill-rule="evenodd" d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708" clip-rule="evenodd"></path>
          </svg></a>
            <div class="dropdown-content">
              <a href="/conversion/length-converter" class="dropdown-link">Length Converter</a>
              <a href="/conversion/weight-converter" class="dropdown-link">Weight Converter</a>
              <a href="/conversion/temperature-converter" class="dropdown-link">Temperature Converter</a>
              <a href="/conversion/case-converter" class="dropdown-link">Case Converter</a>
            </div>
          </div>
          <a href="/word-counter" class="nav-link">Word Counter</a>
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
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeader);
} else {
  loadHeader();
}
