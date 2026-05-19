import { navigateTo } from '../router.js';

export const setupNavbar = () => {
  const navbarRoot = document.getElementById('navbar');
  if (!navbarRoot) return;

  navbarRoot.innerHTML = `
    <div class="navbar">
      <div class="container nav-content">
        <a href="#/" class="logo-link">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7z" fill="currentColor" opacity="0.2"/>
            <path d="M13 13h4v4h-4z"/>
          </svg>
          <span class="text-gradient">Boardly</span>
        </a>
        <div class="nav-links">
          <button id="nav-my-boards" class="btn btn-secondary" style="margin-right: 8px;">My Boards</button>
          <button id="nav-create-board" class="btn btn-primary">Create Board</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('nav-create-board').addEventListener('click', () => {
    navigateTo('/create');
  });
  
  document.getElementById('nav-my-boards').addEventListener('click', () => {
    navigateTo('/my-boards');
  });
};
