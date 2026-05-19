import { THEMES } from '../themes.js';
import { createBoard } from '../store.js';
import { navigateTo } from '../router.js';

export default function CreateBoardPage(container) {
  let selectedTheme = 'sunset';

  container.innerHTML = `
    <div class="container" style="max-width: 800px; padding-top: var(--spacing-8);">
      <h1 style="margin-bottom: var(--spacing-6);">Create a New Board</h1>
      
      <form id="create-board-form" class="card">
        <div class="input-group">
          <label for="recipient-name">Recipient Name</label>
          <input type="text" id="recipient-name" required placeholder="Who is this for?" />
        </div>
        
        <div class="input-group">
          <label for="occasion">Occasion</label>
          <select id="occasion" required>
            <option value="farewell">Farewell</option>
            <option value="birthday">Birthday</option>
            <option value="appreciation">Appreciation</option>
            <option value="celebration">Celebration</option>
            <option value="get_well">Get Well</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div class="input-group">
          <label for="board-title">Board Title</label>
          <input type="text" id="board-title" required placeholder="e.g. We will miss you, Sarah!" />
        </div>
        
        <div class="input-group">
          <label>Select Theme</label>
          <div class="theme-grid" id="theme-grid">
            ${Object.values(THEMES).map(theme => `
              <div class="theme-option ${theme.id === selectedTheme ? 'selected' : ''}" 
                   data-theme="${theme.id}"
                   style="background-image: ${theme.backgroundImage || 'none'}; background-color: ${theme.background};">
                ${theme.name}
              </div>
            `).join('')}
          </div>
        </div>
        
        <div style="margin-top: var(--spacing-6); text-align: right;">
          <button type="submit" class="btn btn-primary" style="font-size: 1.1rem;">Create Board</button>
        </div>
      </form>
    </div>
  `;

  // Theme selection logic
  const themeOptions = container.querySelectorAll('.theme-option');
  themeOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      themeOptions.forEach(opt => opt.classList.remove('selected'));
      const target = e.currentTarget;
      target.classList.add('selected');
      selectedTheme = target.dataset.theme;
    });
  });

  // Form submission
  const form = container.querySelector('#create-board-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const recipient = document.getElementById('recipient-name').value.trim();
    const occasion = document.getElementById('occasion').value;
    const title = document.getElementById('board-title').value.trim();
    
    const boardId = createBoard({
      recipient,
      occasion,
      title,
      theme: selectedTheme
    });
    
    navigateTo(`/board/${boardId}`);
  });
}
