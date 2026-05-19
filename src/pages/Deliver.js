import { getBoard } from '../store.js';
import { navigateTo } from '../router.js';
import { createConfetti } from '../components/ConfettiEffect.js';

export default function DeliverPage(container, params) {
  const boardId = params.id;
  const board = getBoard(boardId);

  if (!board) {
    navigateTo('/');
    return;
  }

  container.innerHTML = `
    <div class="container" style="max-width: 600px; padding-top: var(--spacing-8); padding-bottom: var(--spacing-12);">
      <h1 style="text-align: center; margin-bottom: var(--spacing-6);">Deliver Board to ${board.recipient}</h1>
      
      <div class="card" style="margin-bottom: var(--spacing-6);">
        <h3>Email Delivery</h3>
        <p style="color: var(--text-secondary); margin-bottom: var(--spacing-4);">Send an email with a beautiful branded header directly to the recipient.</p>
        
        <form id="deliver-form">
          <div class="input-group">
            <label for="recipient-email">Recipient's Email</label>
            <input type="email" id="recipient-email" required placeholder="recipient@example.com" />
          </div>
          
          <div class="input-group">
            <label for="delivery-message">Custom Message</label>
            <textarea id="delivery-message" rows="3" placeholder="Here is a special board we made for you!"></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%;">Send Now</button>
        </form>
      </div>
      
      <div class="card" style="text-align: center;">
        <h3>Or Share Manually</h3>
        <p style="color: var(--text-secondary); margin-bottom: var(--spacing-4);">Copy the link to share via Slack, WhatsApp, or text.</p>
        <button id="copy-link-btn" class="btn btn-secondary">Copy Board Link</button>
      </div>
    </div>
  `;

  // Form submit (mock delivery)
  const form = container.querySelector('#deliver-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('recipient-email').value;
      const btn = form.querySelector('button');
      
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      // Simulate network request
      setTimeout(() => {
        btn.textContent = 'Sent Successfully!';
        btn.style.background = '#10B981'; // green
        createConfetti();
        
        setTimeout(() => {
          navigateTo(`/board/${boardId}`);
        }, 3000);
      }, 1500);
    });
  }
  
  // Copy link
  const copyBtn = container.querySelector('#copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const url = window.location.origin + window.location.pathname + `#/board/${boardId}`;
      navigator.clipboard.writeText(url).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Link Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
      });
    });
  }
}
