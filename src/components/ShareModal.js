export const setupShareModal = (boardId, boardTitle) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  const url = window.location.origin + window.location.pathname + `#/board/${boardId}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}&margin=10`;

  modalRoot.innerHTML = `
    <div class="modal-overlay active" id="share-modal-overlay">
      <div class="modal-content" style="max-width: 450px;">
        <div class="modal-header">
          <h2>Share "${boardTitle}"</h2>
          <button class="modal-close" id="share-modal-close">&times;</button>
        </div>
        
        <div class="modal-body" style="text-align: center;">
          <p style="color: var(--text-secondary); margin-bottom: var(--spacing-6);">
            Invite friends and family to add their messages and photos!
          </p>
          
          <img src="${qrUrl}" alt="QR Code" style="border-radius: var(--radius-md); box-shadow: var(--shadow-sm); margin-bottom: var(--spacing-6);">
          
          <div class="input-group" style="text-align: left;">
            <label>Board Link</label>
            <div style="display: flex; gap: var(--spacing-2);">
              <input type="text" value="${url}" readonly id="share-url-input" style="flex: 1; font-size: 0.9rem;" />
              <button id="copy-link-btn" class="btn btn-secondary">Copy</button>
            </div>
          </div>
          
          ${navigator.share ? `
            <button id="native-share-btn" class="btn btn-primary" style="width: 100%; margin-top: var(--spacing-2);">
              Share via...
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  const overlay = document.getElementById('share-modal-overlay');
  
  const close = () => {
    overlay.classList.remove('active');
    setTimeout(() => {
      modalRoot.innerHTML = '';
    }, 300);
  };

  document.getElementById('share-modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  const copyBtn = document.getElementById('copy-link-btn');
  copyBtn.addEventListener('click', () => {
    const input = document.getElementById('share-url-input');
    input.select();
    navigator.clipboard.writeText(url).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy', 2000);
    });
  });

  if (navigator.share) {
    document.getElementById('native-share-btn').addEventListener('click', () => {
      navigator.share({
        title: `Join ${boardTitle} on Boardly`,
        text: `I invited you to contribute to a board!`,
        url: url
      }).catch(console.error);
    });
  }
};
