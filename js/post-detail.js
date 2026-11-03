/**
 * DevShare Lite - Post Detail & Comment System Logic
 * Môn: Công nghệ Web
 */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');

  const postContainer = document.getElementById('post-detail-container');
  const commentSection = document.getElementById('comments-section');

  if (!postId) {
    postContainer.innerHTML = `
      <div class="empty-state">
        <h3 class="empty-state-title">Không tìm thấy bài viết</h3>
        <p class="empty-state-desc">Đường dẫn không hợp lệ hoặc bài viết đã bị xóa.</p>
        <a href="index.html" class="btn btn-primary">Về trang chủ</a>
      </div>
    `;
    return;
  }

  const post = window.devStore.getPostById(postId);
  if (!post) {
    postContainer.innerHTML = `
      <div class="empty-state">
        <h3 class="empty-state-title">Bài viết không tồn tại</h3>
        <p class="empty-state-desc">Có thể bài viết đã bị tác giả gỡ bỏ.</p>
        <a href="index.html" class="btn btn-primary">Về trang chủ</a>
      </div>
    `;
    return;
  }

  // Set document title
  document.title = `${post.title} - DevShare`;

  const currentUser = window.devStore.getCurrentUser();
  const isOwner = currentUser && (currentUser.id === post.author.id || currentUser.username === post.author.username);

  // Render post detail
  postContainer.innerHTML = `
    ${renderPostCard(post, { isDetailView: true })}

    ${isOwner ? `
      <div class="post-owner-actions" style="margin-top: -8px; margin-bottom: 24px; display: flex; justify-content: flex-end; gap: 8px;">
        <a href="edit-post.html?id=${post.id}" class="btn btn-outline btn-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          Sửa bài viết
        </a>
        <button id="delete-post-btn" class="btn btn-danger btn-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          Xóa bài viết
        </button>
      </div>
    ` : ''}
  `;

  bindPostEvents(postContainer);

  // Owner Delete Action
  const deleteBtn = document.getElementById('delete-post-btn');
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      showConfirmModal({
        title: 'Xóa bài viết này?',
        message: 'Hành động này sẽ xóa vĩnh viễn bài viết và các bình luận liên quan. Bạn có chắc chắn không?',
        confirmText: 'Xóa vĩnh viễn',
        onConfirm: () => {
          window.devStore.deletePost(post.id);
          showToast('Đã xóa bài viết thành công!', 'success');
          setTimeout(() => window.location.href = 'index.html', 500);
        }
      });
    };
  }

  // Render Comments
  renderCommentsSection(post.id);
});

function renderCommentsSection(postId) {
  const container = document.getElementById('comments-section');
  if (!container) return;

  const comments = window.devStore.getComments(postId);
  const currentUser = window.devStore.getCurrentUser();

  container.className = 'comments-container';
  container.innerHTML = `
    <h3 class="comments-header">${comments.length} Bình luận</h3>

    <!-- Form viết bình luận -->
    <form class="comment-form" id="comment-form">
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <img src="${currentUser.profile.avatar}" alt="${currentUser.username}" class="avatar-img" />
        <div style="flex: 1;">
          <textarea 
            class="comment-input" 
            id="comment-input" 
            placeholder="Viết suy nghĩ của bạn về bài viết này..." 
            rows="3"
            required
          ></textarea>
          <div class="comment-form-actions">
            <button type="submit" class="btn btn-primary btn-sm">Gửi bình luận</button>
          </div>
        </div>
      </div>
    </form>

    <!-- Danh sách bình luận -->
    <div class="comment-list" id="comments-list">
      ${comments.length === 0 ? `
        <div style="text-align: center; color: var(--text-muted); padding: 20px;">
          Chưa có bình luận nào. Hãy là người đầu tiên để lại ý kiến!
        </div>
      ` : comments.map(c => `
        <div class="comment-item">
          <img src="${c.author.profile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}" alt="${c.author.username}" class="avatar-img" />
          <div class="comment-content">
            <div class="comment-meta">
              <span class="comment-author">u/${c.author.username}</span>
              <span>•</span>
              <span class="comment-time">${formatTimeAgo(c.created_at)}</span>
            </div>
            <p class="comment-text">${c.content.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Submit comment handler
  const form = document.getElementById('comment-form');
  const input = document.getElementById('comment-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = input.value.trim();
    if (!content) return;

    window.devStore.addComment(postId, content);
    showToast('Đã đăng bình luận thành công!', 'success');
    renderCommentsSection(postId);
  });
}
