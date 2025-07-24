function createHeader() {
  const header = document.createElement('header');
  header.className = 'w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10';
  
  header.innerHTML = `
    <div class="container mx-auto px-4 py-4">
      <nav class="w-full max-w-full">
        <ul class="flex justify-center space-x-8 list-none p-0 m-0">
          <li>
            <a href="/" class="nav-link text-white hover:text-white hover:bg-white/10 bg-transparent px-4 py-2 rounded-md transition-colors">
              Percentage Calculator
            </a>
          </li>
          
          <li>
            <a href="/word-counter.html" class="nav-link text-white hover:text-white hover:bg-white/10 bg-transparent px-4 py-2 rounded-md transition-colors">
              Word Counter
            </a>
          </li>
          
          <li class="relative dropdown">
            <button class="nav-trigger text-white hover:text-white hover:bg-white/10 bg-transparent px-4 py-2 rounded-md transition-colors">
              Conversion ▼
            </button>
            <div class="dropdown-content absolute top-full left-0 w-48 p-2 bg-white rounded-md shadow-lg hidden">
              <a href="/conversion/length-converter.html" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100">
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
      </nav>
    </div>
  `;
  
  // Add dropdown functionality
  const dropdown = header.querySelector('.dropdown');
  const trigger = header.querySelector('.nav-trigger');
  const content = header.querySelector('.dropdown-content');
  
  trigger.addEventListener('click', () => {
    content.classList.toggle('hidden');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      content.classList.add('hidden');
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
