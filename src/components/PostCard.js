export const renderPostCard = (post, style = 'polaroid', isEditable = false) => {
  // Use a slight random rotation for a more organic feel
  const rotation = (Math.random() * 4 - 2).toFixed(1); // -2 to +2 degrees
  const tilt = `transform: rotate(${rotation}deg);`;

  return `
    <div class="post-card ${style}" style="background-color: ${post.color || '#ffffff'}; ${tilt}" data-post-id="${post.id}">
      ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image" loading="lazy" onerror="this.src='https://placehold.co/600x400/e2e8f0/64748b?text=Image+Failed+to+Load'">` : ''}
      ${post.text ? `<p class="post-text">${post.text.replace(/\\n/g, '<br>')}</p>` : ''}
      
      <div style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%; margin-top: auto; padding-top: var(--spacing-4);">
        ${isEditable ? `
        <div class="post-actions" style="display: flex; gap: var(--spacing-2);">
          <button class="btn-edit-post" data-id="${post.id}" style="background: none; border: none; cursor: pointer; color: rgba(0,0,0,0.4); padding: 4px; border-radius: 4px;" title="Edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button class="btn-delete-post" data-id="${post.id}" style="background: none; border: none; cursor: pointer; color: rgba(0,0,0,0.4); padding: 4px; border-radius: 4px;" title="Delete">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
        ` : '<div></div>'}
        <span class="post-author">— ${post.author || 'Anonymous'}</span>
      </div>
    </div>
  `;
};
