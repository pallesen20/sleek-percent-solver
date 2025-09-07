function loadHeader() {
  const headerHTML = `
    <header class="header-glass">
      <div class="header-container">
        <nav class="nav-menu">
          <a href="/" class="nav-link">Percentage Calculator</a>
          <div class="nav-dropdown">
            <a href="#" class="nav-link dropdown-toggle">Conversion ▼</a>
            <div class="dropdown-content">
              <a href="/conversion/length-converter" class="dropdown-link">Length Converter</a>
              <a href="/conversion/weight-converter" class="dropdown-link">Weight Converter</a>
            </div>
          </div>
          <a href="/word-counter" class="nav-link">Word Counter</a>
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
