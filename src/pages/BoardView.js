import { getBoard, deletePost, canModifyPost } from '../store.js';
import { THEMES } from '../themes.js';
import { navigateTo } from '../router.js';
import { renderPostCard } from '../components/PostCard.js';
import { setupPostModal } from '../components/PostModal.js';
import { setupShareModal } from '../components/ShareModal.js';

export default function BoardViewPage(container, params) {
  const boardId = params.id;
  const board = getBoard(boardId);

  if (!board) {
    container.innerHTML = `
      <div class="container" style="text-align: center; padding-top: var(--spacing-12);">
        <h1>Board Not Found</h1>
        <p style="color: var(--text-secondary); margin-top: var(--spacing-4);">The board you are looking for does not exist or has been deleted.</p>
        <button id="not-found-home" class="btn btn-primary" style="margin-top: var(--spacing-6);">Go Home</button>
      </div>
    `;
    const btn = container.querySelector('#not-found-home');
    if (btn) btn.addEventListener('click', () => navigateTo('/'));
    return;
  }

  const theme = THEMES[board.theme] || THEMES.corkboard;
  
  // Set textured background
  if (theme.backgroundImage) {
    container.style.backgroundImage = theme.backgroundImage;
    container.style.backgroundColor = theme.background;
  } else {
    container.style.background = theme.background;
  }
  container.style.minHeight = '100vh';
  
  const posts = board.posts || [];

  container.innerHTML = `
    <div class="board-header">
      <h1>${board.title}</h1>
      <p>A ${board.occasion} board for ${board.recipient}</p>
      <div style="margin-top: var(--spacing-6); display: flex; justify-content: center; gap: var(--spacing-3); position: relative; z-index: 2;">
        <button id="share-btn" class="btn btn-secondary">Share Link & QR</button>
        <button id="deliver-btn" class="btn btn-primary">Deliver Board</button>
      </div>
    </div>

    <div class="container" style="padding-bottom: var(--spacing-12);">
      ${posts.length === 0 ? `
        <div style="text-align: center; padding: var(--spacing-12) 0; color: var(--text-primary); text-shadow: 0 1px 2px rgba(255,255,255,0.5);">
          <div style="font-size: 3rem; margin-bottom: var(--spacing-4);">📝</div>
          <h2 style="font-family: var(--font-handwriting); font-size: 2.5rem;">No posts yet!</h2>
          <p style="font-weight: 500;">Be the first to add a message or photo to this board.</p>
        </div>
      ` : `
        <div class="masonry-grid" id="board-posts-grid">
          ${posts.map(post => renderPostCard(post, theme.cardStyle, canModifyPost(boardId, post.id))).join('')}
        </div>
      `}
    </div>

    <button id="add-post-fab" class="fab" title="Add a Post">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </button>
  `;

  // Event Listeners
  const addPostBtn = container.querySelector('#add-post-fab');
  if (addPostBtn) {
    addPostBtn.addEventListener('click', () => {
      setupPostModal(boardId, () => {
        BoardViewPage(container, params);
      });
    });
  }

  const shareBtn = container.querySelector('#share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      setupShareModal(boardId, board.title);
    });
  }
  
  const deliverBtn = container.querySelector('#deliver-btn');
  if (deliverBtn) {
    deliverBtn.addEventListener('click', () => {
      navigateTo(`/board/${boardId}/deliver`);
    });
  }

  // Edit / Delete post listeners
  const boardPostsGrid = container.querySelector('#board-posts-grid');
  if (boardPostsGrid) {
    boardPostsGrid.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.btn-edit-post');
      const deleteBtn = e.target.closest('.btn-delete-post');

      if (editBtn) {
        const postId = editBtn.dataset.id;
        if (!canModifyPost(boardId, postId)) return alert("You don't have permission to edit this post!");
        
        const currentBoard = getBoard(boardId);
        const postToEdit = currentBoard.posts.find(p => p.id === postId);
        if (postToEdit) {
          setupPostModal(boardId, () => {
            BoardViewPage(container, params);
          }, postToEdit);
        }
      }

      if (deleteBtn) {
        const postId = deleteBtn.dataset.id;
        if (!canModifyPost(boardId, postId)) return alert("You don't have permission to delete this post!");
        
        if (confirm('Are you sure you want to delete this post?')) {
          deletePost(boardId, postId);
          BoardViewPage(container, params);
        }
      }
    });
  }
}
