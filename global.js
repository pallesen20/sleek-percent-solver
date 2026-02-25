document.addEventListener('DOMContentLoaded', () => {
const el = document.getElementById('last-updated');
if (el) {
  const d = new Date(document.lastModified);
  const formatted = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  el.outerHTML = `<time datetime="${formatted}"><span>${formatted}</span></time>`;
}
});
