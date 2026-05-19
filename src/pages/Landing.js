import { navigateTo } from '../router.js';

export default function LandingPage(container) {
  container.innerHTML = `
    <div class="hero">
      <div class="container">
        <h1 class="text-gradient">Every story deserves a beautiful board.</h1>
        <p>Create stunning, collaborative digital boards for birthdays, farewells, anniversaries, and team appreciation. Invite anyone to pin cards, custom photos, and AI-generated messages.</p>
        <button id="hero-create-btn" class="btn btn-primary" style="font-size: 1.25rem; padding: 1rem 2rem;">
          Create a Board — It's Free
        </button>
      </div>
    </div>

    <div class="container" style="padding: var(--spacing-8) 0;">
      <h2 style="text-align: center; margin-bottom: var(--spacing-8);">How It Works</h2>
      <div class="masonry-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
        <div class="card" style="text-align: center;">
          <h3 style="font-size: 2rem; color: var(--brand-primary); margin-bottom: var(--spacing-4);">1</h3>
          <h4>Create a Board</h4>
          <p style="color: var(--text-secondary); margin-top: var(--spacing-2);">Pick a theme and set a delivery date.</p>
        </div>
        <div class="card" style="text-align: center;">
          <h3 style="font-size: 2rem; color: var(--brand-primary); margin-bottom: var(--spacing-4);">2</h3>
          <h4>Invite Friends</h4>
          <p style="color: var(--text-secondary); margin-top: var(--spacing-2);">Share the link so others can add their messages.</p>
        </div>
        <div class="card" style="text-align: center;">
          <h3 style="font-size: 2rem; color: var(--brand-primary); margin-bottom: var(--spacing-4);">3</h3>
          <h4>Deliver with Joy</h4>
          <p style="color: var(--text-secondary); margin-top: var(--spacing-2);">Send the completed board to the lucky recipient.</p>
        </div>
      </div>
    </div>
  `;

  const btn = container.querySelector('#hero-create-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      navigateTo('/create');
    });
  }
}
