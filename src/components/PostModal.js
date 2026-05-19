import { addPostToBoard, updatePost } from '../store.js';
import { generateAIText, generateAIImageUrl, getPublicImages } from '../utils.js';

export const setupPostModal = (boardId, onSuccess, initialData = null) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  let selectedColor = initialData?.color || '#ffffff';
  let selectedMediaUrl = initialData?.image || null;

  const colors = ['#ffffff', '#f1f5f9', '#e0f2fe', '#dcfce7', '#fef3c7', '#fee2e2'];
  const keywordOptions = [
    'Heartfelt', 'Funny', 'Professional', 'Sarcastic', 'Poetic', 'Inspiring', 
    'Casual', 'Appreciative', 'Formal', 'Short', 'Long', 'Memories', 'Inside Joke', 
    'Grateful', 'Sad', 'Excited', 'Witty', 'Proud', 'Sincere', 'Playful', 'Chill', 'Quirky'
  ];

  modalRoot.innerHTML = `
    <div class="modal-overlay active" id="post-modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2 style="font-size: 1.5rem; margin: 0;">${initialData ? 'Edit Post' : 'Add to Board'}</h2>
          <button class="modal-close" id="post-modal-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div class="tabs">
          <button class="tab-btn active" data-tab="tab-write">Write</button>
          <button class="tab-btn" data-tab="tab-ai-text">AI Assist</button>
          <button class="tab-btn" data-tab="tab-ai-image">AI Image</button>
          <button class="tab-btn" data-tab="tab-public-image">Gallery</button>
        </div>
        
        <form id="add-post-form" class="modal-body">
          
          <!-- TAB 1: Write -->
          <div id="tab-write" class="tab-content active">
            <div class="input-group">
              <textarea id="post-text" rows="5" placeholder="Write something nice..." style="resize: vertical; font-size: 1.05rem;">${initialData?.text || ''}</textarea>
            </div>
          </div>
          
          <!-- TAB 2: AI Text -->
          <div id="tab-ai-text" class="tab-content">
            <p style="color: var(--text-secondary); margin-bottom: var(--spacing-4); font-size: 0.9rem;">Select keywords or add your own.</p>
            
            <div class="input-group" style="display: flex; gap: var(--spacing-2); margin-bottom: var(--spacing-2);">
              <input type="text" id="custom-keyword-input" placeholder="Enter custom keyword..." style="flex: 1; padding: 0.4rem 0.8rem; font-size: 0.85rem;" />
              <button type="button" id="btn-add-keyword" class="btn btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.85rem;">Add</button>
            </div>

            <div class="pill-container" id="ai-keyword-pills" style="margin-bottom: var(--spacing-4); gap: 4px;">
              ${keywordOptions.map(kw => `<div class="keyword-pill" data-keyword="${kw.toLowerCase()}" style="padding: 2px 10px; font-size: 0.75rem;">${kw}</div>`).join('')}
            </div>
            
            <button type="button" id="btn-generate-text" class="btn btn-secondary" style="width: 100%;">Generate Message</button>
            
            <div id="ai-text-loader" class="ai-loading" style="display: none; justify-content: center; margin-top: var(--spacing-4);">
              <div class="spinner"></div> Generating message...
            </div>
          </div>
          
          <!-- TAB 3: AI Image -->
          <div id="tab-ai-image" class="tab-content">
            <p style="color: var(--text-secondary); margin-bottom: var(--spacing-4);">Describe an image, and AI will create it for you instantly.</p>
            <div class="input-group" style="display: flex; gap: var(--spacing-2);">
              <input type="text" id="ai-image-prompt" placeholder="e.g. A cute dog wearing a party hat" style="flex: 1;" />
              <button type="button" id="btn-generate-image" class="btn btn-secondary">Create</button>
            </div>
            <div id="ai-image-preview-container" style="display: ${selectedMediaUrl && selectedMediaUrl.includes('pollinations') ? 'block' : 'none'}; margin-top: var(--spacing-4); text-align: center;">
              <img id="ai-image-preview" src="${selectedMediaUrl && selectedMediaUrl.includes('pollinations') ? selectedMediaUrl : ''}" style="max-width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);" />
              <div id="ai-img-loading" style="display: none; color: var(--text-secondary); margin-top: 8px;">Generating your masterpiece...</div>
              <button type="button" class="btn btn-secondary btn-clear-media" style="margin-top: var(--spacing-2); font-size: 0.8rem;">Remove Image</button>
            </div>
          </div>

          <!-- TAB 4: Public Gallery -->
          <div id="tab-public-image" class="tab-content">
            <p style="color: var(--text-secondary); margin-bottom: var(--spacing-4);">Pick a beautiful stock photo to attach to your post.</p>
            <div class="input-group" style="display: flex; gap: var(--spacing-2);">
              <input type="text" id="gallery-search" placeholder="e.g. Celebration" style="flex: 1;" />
              <button type="button" id="btn-search-gallery" class="btn btn-secondary">Search</button>
            </div>
            <div id="gallery-loader" class="ai-loading" style="display: none; justify-content: center;">
              <div class="spinner"></div> Searching...
            </div>
            <div id="gallery-results" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-2); margin-top: var(--spacing-4);">
              ${selectedMediaUrl && !selectedMediaUrl.includes('pollinations') ? `
                <img src="${selectedMediaUrl}" style="width: 100%; height: 120px; object-fit: cover; border-radius: var(--radius-sm); border: 2px solid var(--brand-primary);" class="selected-gallery-img">
              ` : ''}
            </div>
            <div id="gallery-preview-actions" style="display: ${selectedMediaUrl && !selectedMediaUrl.includes('pollinations') ? 'block' : 'none'}; text-align: center;">
              <button type="button" class="btn btn-secondary btn-clear-media" style="margin-top: var(--spacing-2); font-size: 0.8rem;">Remove Image</button>
            </div>
          </div>
          
          <hr style="border: 0; border-top: 1px solid var(--border-color); margin: var(--spacing-6) 0;" />
          
          <div class="input-group">
            <label>Card Color</label>
            <div class="color-picker">
              ${colors.map(color => `
                <div class="color-swatch ${color === selectedColor ? 'selected' : ''}" 
                     data-color="${color}" 
                     style="background-color: ${color}; border: 1px solid ${color === '#ffffff' ? '#E2E8F0' : color};">
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="input-group">
            <label>Your Name</label>
            <input type="text" id="post-author" placeholder="Leave blank to post anonymously" value="${initialData?.author || ''}" />
          </div>
          
          <div style="margin-top: var(--spacing-8); display: flex; justify-content: flex-end; gap: var(--spacing-3);">
            <button type="button" class="btn btn-secondary" id="btn-cancel-post">Cancel</button>
            <button type="submit" class="btn btn-primary">${initialData ? 'Save Changes' : 'Add to Board'}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const overlay = document.getElementById('post-modal-overlay');
  
  const close = () => {
    overlay.classList.remove('active');
    setTimeout(() => {
      modalRoot.innerHTML = '';
    }, 300);
  };

  document.getElementById('post-modal-close').addEventListener('click', close);
  document.getElementById('btn-cancel-post').addEventListener('click', close);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // Tab switching logic
  const tabBtns = modalRoot.querySelectorAll('.tab-btn');
  const tabContents = modalRoot.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Color picker
  const swatches = modalRoot.querySelectorAll('.color-swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      swatches.forEach(s => s.classList.remove('selected'));
      const target = e.currentTarget;
      target.classList.add('selected');
      selectedColor = target.dataset.color;
    });
  });

  // AI Keyword Pills multi-select
  let selectedKeywords = [];
  const pillsContainer = document.getElementById('ai-keyword-pills');
  
  const bindPillEvent = (pill) => {
    pill.addEventListener('click', () => {
      const kw = pill.dataset.keyword;
      if (selectedKeywords.includes(kw)) {
        selectedKeywords = selectedKeywords.filter(k => k !== kw);
        pill.classList.remove('active');
      } else {
        selectedKeywords.push(kw);
        pill.classList.add('active');
      }
    });
  };
  
  pillsContainer.querySelectorAll('.keyword-pill').forEach(bindPillEvent);

  // Custom keyword input
  const addKeywordBtn = document.getElementById('btn-add-keyword');
  const customKeywordInput = document.getElementById('custom-keyword-input');
  
  const addCustomKeyword = () => {
    const val = customKeywordInput.value.trim();
    if (val) {
      const kw = val.toLowerCase();
      // Add pill to UI
      const pill = document.createElement('div');
      pill.className = 'keyword-pill active';
      pill.style.padding = '2px 10px';
      pill.style.fontSize = '0.75rem';
      pill.dataset.keyword = kw;
      pill.textContent = val;
      
      pillsContainer.appendChild(pill);
      bindPillEvent(pill);
      
      // Select it automatically
      selectedKeywords.push(kw);
      customKeywordInput.value = '';
    }
  };

  addKeywordBtn.addEventListener('click', addCustomKeyword);
  customKeywordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomKeyword();
    }
  });

  // AI Text Generation
  const btnGenerateText = document.getElementById('btn-generate-text');
  btnGenerateText.addEventListener('click', async () => {
    if (selectedKeywords.length === 0) {
      alert('Please select at least one keyword.');
      return;
    }
    
    const loader = document.getElementById('ai-text-loader');
    const textarea = document.getElementById('post-text');
    
    loader.style.display = 'flex';
    btnGenerateText.disabled = true;
    
    const text = await generateAIText(selectedKeywords);
    textarea.value = text;
    
    loader.style.display = 'none';
    btnGenerateText.disabled = false;
    
    // Switch back to write tab to see text
    tabBtns[0].click();
  });

  // AI Image Generation
  const btnGenerateImage = document.getElementById('btn-generate-image');
  btnGenerateImage.addEventListener('click', async () => {
    const promptText = document.getElementById('ai-image-prompt').value.trim();
    if (!promptText) return alert('Please enter a prompt for the image.');
    
    const previewContainer = document.getElementById('ai-image-preview-container');
    const previewImg = document.getElementById('ai-image-preview');
    const loadingText = document.getElementById('ai-img-loading');
    
    previewImg.style.display = 'none'; // hide until loaded
    loadingText.textContent = 'Generating your masterpiece...';
    loadingText.style.display = 'block';
    previewContainer.style.display = 'block';
    btnGenerateImage.disabled = true;
    
    try {
      const url = await generateAIImageUrl(promptText);
      
      // We use a clean, in-memory preloader. 
      // This prevents the browser from firing a false-positive "onerror" event 
      // when aborting a previous pending image load on the DOM element!
      const imgLoader = new Image();
      
      imgLoader.onload = () => {
        selectedMediaUrl = imgLoader.src;
        previewImg.src = imgLoader.src;
        loadingText.style.display = 'none';
        previewImg.style.display = 'inline-block';
        btnGenerateImage.disabled = false;
      };
      
      imgLoader.onerror = () => {
        loadingText.innerHTML = '⚠️ Image generation failed or timed out.<br>Please try a slightly simpler prompt!';
        previewImg.style.display = 'none';
        btnGenerateImage.disabled = false;
      };
      
      imgLoader.src = url;
    } catch (e) {
      loadingText.textContent = 'Image generation failed. Please try again.';
      btnGenerateImage.disabled = false;
    }
  });

  // Clear media handlers
  const clearMediaBtns = modalRoot.querySelectorAll('.btn-clear-media');
  clearMediaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedMediaUrl = null;
      document.getElementById('ai-image-preview-container').style.display = 'none';
      document.getElementById('gallery-results').innerHTML = '';
      document.getElementById('gallery-preview-actions').style.display = 'none';
    });
  });

  // Public Image Gallery
  const btnSearchGallery = document.getElementById('btn-search-gallery');
  btnSearchGallery.addEventListener('click', async () => {
    const term = document.getElementById('gallery-search').value.trim();
    const loader = document.getElementById('gallery-loader');
    const resultsContainer = document.getElementById('gallery-results');
    const previewActions = document.getElementById('gallery-preview-actions');
    
    resultsContainer.innerHTML = '';
    previewActions.style.display = 'none';
    loader.style.display = 'flex';
    btnSearchGallery.disabled = true;
    
    const images = await getPublicImages(term);
    
    loader.style.display = 'none';
    btnSearchGallery.disabled = false;
    
    images.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.style.width = '100%';
      img.style.height = '120px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = 'var(--radius-sm)';
      img.style.cursor = 'pointer';
      img.style.border = '3px solid transparent';
      img.style.transition = 'transform 0.2s, border-color 0.2s';
      
      img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.02)');
      img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
      
      img.addEventListener('click', () => {
        resultsContainer.querySelectorAll('img').forEach(i => {
          i.style.borderColor = 'transparent';
          i.classList.remove('selected-gallery-img');
        });
        img.style.borderColor = 'var(--brand-primary)';
        img.classList.add('selected-gallery-img');
        selectedMediaUrl = url;
        previewActions.style.display = 'block';
      });
      
      // Fallback for broken images
      img.onerror = () => { img.style.display = 'none'; };
      
      resultsContainer.appendChild(img);
    });
  });

  // Form submit
  document.getElementById('add-post-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = document.getElementById('post-text').value.trim();
    const author = document.getElementById('post-author').value.trim();
    
    if (!text && !selectedMediaUrl) {
      alert('Please add a message or an image to your post.');
      return;
    }
    
    const postData = {
      text,
      image: selectedMediaUrl,
      color: selectedColor,
      author: author || 'Anonymous'
    };

    if (initialData) {
      updatePost(boardId, initialData.id, postData);
    } else {
      addPostToBoard(boardId, postData);
    }
    
    close();
    if (onSuccess) onSuccess();
  });
};
