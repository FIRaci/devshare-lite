/**
 * DevShare Lite - Feed Rendering & Post Card Component
 * Môn: Công nghệ Web
 */

function renderPostCard(post, { isDetailView = false } = {}) {
  const isUpvoted = post.user_vote === 1;
  const isDownvoted = post.user_vote === -1;
  const isSaved = post.is_saved;

  const contentHtml = renderMarkdown(post.content || '');

  return `
    <article class="post-card" id="post-${post.id}" data-id="${post.id}">
      <!-- Cột Vote -->
      <div class="vote-col">
        <button class="vote-btn ${isUpvoted ? 'upvoted' : ''}" data-action="upvote" title="Upvote (+1)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
        <span class="vote-score ${isUpvoted ? 'upvoted' : ''} ${isDownvoted ? 'downvoted' : ''}" id="score-${post.id}">
          ${post.score}
        </span>
        <button class="vote-btn ${isDownvoted ? 'downvoted' : ''}" data-action="downvote" title="Downvote (-1)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      <!-- Nội dung bài viết -->
      <div class="post-main">
        <div class="post-meta">
          <a href="community.html?name=${post.community.name}" class="post-community">c/${post.community.name}</a>
          <span>•</span>
          <span>Đăng bởi <a href="profile.html?u=${post.author.username}" class="post-author">u/${post.author.username}</a></span>
          <span>•</span>
          <span>${formatTimeAgo(post.created_at)}</span>
        </div>

        <h2 class="post-title" onclick="window.location.href='post.html?id=${post.id}'">
          ${post.title}
        </h2>

        ${isDetailView ? `
          <div class="markdown-body">
            ${contentHtml}
          </div>
        ` : `
          <div class="post-body-preview has-fade" onclick="window.location.href='post.html?id=${post.id}'">
            <div class="markdown-body">
              ${contentHtml}
            </div>
          </div>
        `}

        ${post.image_url ? `
          <img src="${post.image_url}" alt="${post.title}" class="post-banner-img" onclick="${!isDetailView ? `window.location.href='post.html?id=${post.id}'` : ''}" />
        ` : ''}

        <!-- Thanh công cụ bên dưới bài viết -->
        <div class="post-actions">
          <div class="action-buttons">
            <a href="post.html?id=${post.id}#comments" class="action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>${post.comment_count || 0} Bình luận</span>
            </a>

            <button class="action-btn ${isSaved ? 'saved' : ''}" data-action="save">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <span id="save-text-${post.id}">${isSaved ? 'Đã lưu' : 'Lưu bài'}</span>
            </button>

            <button class="action-btn" data-action="share">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>Chia sẻ</span>
            </button>
          </div>

          <div>
            <button class="action-btn" data-action="hide" title="Ẩn bài viết khỏi bảng tin">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
              <span>Ẩn</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

// Gắn lắng nghe sự kiện vote, save, hide, share
function bindPostEvents(container) {
  if (!container) return;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const postCard = btn.closest('.post-card');
    if (!postCard) return;

    const postId = Number(postCard.dataset.id);
    const action = btn.dataset.action;

    // Upvote / Downvote
    if (action === 'upvote' || action === 'downvote') {
      const res = window.devStore.votePost(postId, action);
      if (res) {
        const scoreEl = postCard.querySelector(`#score-${postId}`);
        const upBtn = postCard.querySelector('[data-action="upvote"]');
        const downBtn = postCard.querySelector('[data-action="downvote"]');

        if (scoreEl) {
          scoreEl.textContent = res.score;
          scoreEl.className = 'vote-score ' + (res.user_vote === 1 ? 'upvoted' : res.user_vote === -1 ? 'downvoted' : '');
        }

        if (upBtn) {
          upBtn.className = 'vote-btn ' + (res.user_vote === 1 ? 'upvoted' : '');
        }

        if (downBtn) {
          downBtn.className = 'vote-btn ' + (res.user_vote === -1 ? 'downvoted' : '');
        }

        showToast(res.user_vote === 1 ? 'Đã upvote bài viết!' : res.user_vote === -1 ? 'Đã downvote bài viết!' : 'Đã hủy vote!', 'info');
      }
    }

    // Save / Unsave
    else if (action === 'save') {
      const isSaved = window.devStore.toggleSavePost(postId);
      btn.className = `action-btn ${isSaved ? 'saved' : ''}`;
      
      const saveText = postCard.querySelector(`#save-text-${postId}`);
      if (saveText) saveText.textContent = isSaved ? 'Đã lưu' : 'Lưu bài';

      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', isSaved ? 'currentColor' : 'none');

      showToast(isSaved ? 'Đã lưu bài viết vào danh sách' : 'Đã bỏ lưu bài viết', 'success');
    }

    // Hide post
    else if (action === 'hide') {
      window.devStore.hidePost(postId);
      postCard.style.transition = 'all 0.3s ease';
      postCard.style.opacity = '0';
      postCard.style.transform = 'scale(0.95)';
      setTimeout(() => {
        postCard.remove();
        showToast('Đã ẩn bài viết khỏi bảng tin của bạn', 'info');
      }, 300);
    }

    // Share link
    else if (action === 'share') {
      const shareUrl = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, '')}/post.html?id=${postId}`;
      navigator.clipboard?.writeText(shareUrl).then(() => {
        showToast('Đã sao chép liên kết bài viết vào bộ nhớ tạm!', 'success');
      }).catch(() => {
        showToast(`Link bài viết: post.html?id=${postId}`, 'info');
      });
    }
  });
}

// Hàm nạp danh sách feed
function renderFeed({ containerId, filter = 'all', communityName = null, authorName = null, search = null, emptyTitle = 'Chưa có bài viết nào', emptyDesc = 'Hãy là người đầu tiên tạo bài viết mới!' }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const posts = window.devStore.getPosts({ filter, communityName, authorName, search });

  if (posts.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <h3 class="empty-state-title">${emptyTitle}</h3>
        <p class="empty-state-desc">${emptyDesc}</p>
        <a href="submit.html" class="btn btn-primary">+ Tạo bài viết mới</a>
      </div>
    `;
    return;
  }

  container.innerHTML = posts.map(post => renderPostCard(post)).join('');
  bindPostEvents(container);
}
