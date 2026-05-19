import { initRouter } from './router.js';
import { setupNavbar } from './components/Navbar.js';
import { setupFooter } from './components/Footer.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize shared layout components
  setupNavbar();
  setupFooter();

  // Initialize routing
  initRouter();
});
