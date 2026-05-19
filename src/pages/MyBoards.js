import { getAllBoards, deleteBoard } from '../store.js';
import { navigateTo } from '../router.js';
import { formatDate } from '../utils.js';
import { THEMES } from '../themes.js';

export default function MyBoardsPage(container) {
  const boards = getAllBoards();

  const renderBoards = () => {
    if (boards.length === 0) {
      return `
        <div class="card" style="text-align: center; padding: var(--spacing-8);">
          <h2 style="margin-bottom: var(--spacing-4);">You haven't created any boards yet</h2>
          <button id="empty-create-btn" class="btn btn-primary">Create Your First Board</button>
        </div>
      `;
    }

    return `
      <div class="masonry-grid">
        ${boards.map(board => {
          const theme = THEMES[board.theme] || THEMES.sunset;
          return `
            <div class="card" style="position: relative; overflow: hidden;">
              <div style="height: 100px; background-image: ${theme.backgroundImage || 'none'}; background-color: ${theme.background}; background-size: cover; margin: calc(-1 * var(--spacing-6)) calc(-1 * var(--spacing-6)) var(--spacing-4) calc(-1 * var(--spacing-6));"></div>
              <h3>${board.title}</h3>
              <p style="color: var(--text-secondary); margin-bottom: var(--spacing-2);">For: ${board.recipient}</p>
              <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: var(--spacing-4);">Created: ${formatDate(board.createdAt)}</p>
              
              <div style="display: flex; gap: var(--spacing-2);">
                <button class="btn btn-primary view-btn" data-id="${board.id}" style="flex: 1;">View</button>
                <button class="btn btn-secondary delete-btn" data-id="${board.id}">Delete</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  };

  container.innerHTML = `
    <div class="container" style="padding-top: var(--spacing-8);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-6);">
        <h1>My Boards</h1>
        ${boards.length > 0 ? '<button id="header-create-btn" class="btn btn-primary">Create New Board</button>' : ''}
      </div>
      ${renderBoards()}
    </div>
  `;

  // Event Listeners
  container.addEventListener('click', (e) => {
    if (e.target.id === 'empty-create-btn' || e.target.id === 'header-create-btn') {
      navigateTo('/create');
    }
    
    if (e.target.classList.contains('view-btn')) {
      const id = e.target.dataset.id;
      navigateTo(`/board/${id}`);
    }
    
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.dataset.id;
      if (confirm('Are you sure you want to delete this board? This cannot be undone.')) {
        deleteBoard(id);
        MyBoardsPage(container); // Re-render
      }
    }
  });
}
