function createHeader() {
  const header = document.createElement('header');
  header.className = 'w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 relative z-40';
  
  header.innerHTML = `
    <div class="container mx-auto px-4 py-4">
      <nav class="w-full max-w-full">
        <!-- Mobile burger button -->
        <div class="md:hidden flex justify-end">
          <button id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <!-- Burger icon -->
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <!-- Close icon (hidden by default) -->
            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Desktop navigation -->
        <ul class="hidden md:flex justify-center space-x-8 list-none p-0 m-0">
          <li>
            <a href="/" class="nav-link inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-white hover:text-white hover:bg-white/10 bg-transparent px-4 py-2 transition-colors relative z-50">
              Percentage Calculator
            </a>
          </li>
          
          <li>
            <a href="/word-counter" class="nav-link inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-white hover:text-white hover:bg-white/10 bg-transparent px-4 py-2 transition-colors relative z-50">
              Word Counter
            </a>
          </li>
          
          <li class="relative dropdown">
            <button class="nav-trigger inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-white hover:text-white hover:bg-white/10 bg-transparent px-4 py-2 transition-colors relative z-50">
              Conversion
              <svg class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
              </svg>
            </button>
            <div class="dropdown-content absolute top-full left-0 z-[60] w-48 p-2 bg-white rounded-md shadow-lg border hidden">
              <a href="/conversion/length-converter" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100">
                <div class="text-sm font-medium leading-none text-gray-900">
                  Length Converter
                </div>
                <p class="text-sm leading-snug text-gray-600">
                  Convert between different length units
                </p>
              </a>
            </div>
          </li>
        </ul>

        <!-- Mobile navigation menu -->
        <div id="mobile-menu" class="md:hidden hidden absolute top-full left-0 right-0 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-t border-white/10 z-50">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <a href="/" class="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-white/10 transition-colors">
              Percentage Calculator
            </a>
            <a href="/word-counter" class="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-white/10 transition-colors">
              Word Counter
            </a>
            <div class="relative mobile-dropdown">
              <button class="mobile-dropdown-trigger w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between">
                Conversion
                <svg class="h-4 w-4 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                </svg>
              </button>
              <div class="mobile-dropdown-content hidden ml-4 mt-1">
                <a href="/conversion/length-units" class="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                  Length Converter
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  `;
  
  // Add mobile menu functionality
  const mobileMenuButton = header.querySelector('#mobile-menu-button');
  const mobileMenu = header.querySelector('#mobile-menu');
  const burgerIcon = mobileMenuButton.querySelector('svg:first-child');
  const closeIcon = mobileMenuButton.querySelector('svg:last-child');
  
  mobileMenuButton.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      burgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.remove('hidden');
      burgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'true');
    }
  });

  // Add desktop dropdown functionality
  const dropdown = header.querySelector('.dropdown');
  const trigger = header.querySelector('.nav-trigger');
  const content = header.querySelector('.dropdown-content');
  
  if (trigger && content) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      content.classList.toggle('hidden');
    });
  }
  
  // Add mobile dropdown functionality
  const mobileDropdown = header.querySelector('.mobile-dropdown');
  const mobileDropdownTrigger = header.querySelector('.mobile-dropdown-trigger');
  const mobileDropdownContent = header.querySelector('.mobile-dropdown-content');
  const mobileDropdownIcon = mobileDropdownTrigger.querySelector('svg');
  
  if (mobileDropdownTrigger && mobileDropdownContent) {
    mobileDropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !mobileDropdownContent.classList.contains('hidden');
      
      if (isOpen) {
        mobileDropdownContent.classList.add('hidden');
        mobileDropdownIcon.style.transform = 'rotate(0deg)';
      } else {
        mobileDropdownContent.classList.remove('hidden');
        mobileDropdownIcon.style.transform = 'rotate(180deg)';
      }
    });
  }
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target)) {
      content.classList.add('hidden');
    }
    if (mobileDropdown && !mobileDropdown.contains(e.target)) {
      mobileDropdownContent.classList.add('hidden');
      mobileDropdownIcon.style.transform = 'rotate(0deg)';
    }
    // Close mobile menu when clicking outside
    if (mobileMenu && !header.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      burgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
  });
  
  return header;
}

// Function to insert header into page
function insertHeader() {
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.appendChild(createHeader());
  } else {
    // Insert at the beginning of body if no container exists
    document.body.insertBefore(createHeader(), document.body.firstChild);
  }
}

// Auto-insert when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', insertHeader);
} else {
  insertHeader();
}
