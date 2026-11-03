/**
 * DevShare Lite - Create & Edit Post Logic
 * Môn: Công nghệ Web
 */

document.addEventListener('DOMContentLoaded', () => {
  const communitySelect = document.getElementById('post-community');
  const postForm = document.getElementById('create-post-form');
  const contentInput = document.getElementById('post-content');
  const previewBox = document.getElementById('markdown-preview-box');
  const togglePreviewBtn = document.getElementById('toggle-preview-btn');

  // Populate communities dropdown
  if (communitySelect) {
    const communities = window.devStore.getCommunities();
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedCommunity = urlParams.get('c');

    communitySelect.innerHTML = `
      <option value="">-- Chọn cộng đồng thảo luận --</option>
      ${communities.map(c => `
        <option value="${c.id}" ${preselectedCommunity && preselectedCommunity.toLowerCase() === c.name.toLowerCase() ? 'selected' : ''}>
          c/${c.name} - ${c.description}
        </option>
      `).join('')}
    `;
  }

  // Toggle Markdown Preview
  if (togglePreviewBtn && previewBox && contentInput) {
    let isPreview = false;
    togglePreviewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isPreview = !isPreview;
      if (isPreview) {
        togglePreviewBtn.textContent = '✏️ Chỉnh sửa';
        contentInput.style.display = 'none';
        previewBox.style.display = 'block';
        previewBox.innerHTML = renderMarkdown(contentInput.value) || '<em style="color: var(--text-muted);">Chưa có nội dung để xem trước</em>';
      } else {
        togglePreviewBtn.textContent = '👁️ Xem trước Markdown';
        contentInput.style.display = 'block';
        previewBox.style.display = 'none';
      }
    });
  }

  // Preset image insert helpers
  const presetBtns = document.querySelectorAll('.insert-img-preset');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.url;
      const imgInput = document.getElementById('post-image');
      if (imgInput) {
        imgInput.value = url;
        showToast('Đã chọn hình ảnh đính kèm!', 'info');
      }
    });
  });

  // Handle Create Post Submit
  if (postForm) {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const communityId = document.getElementById('post-community').value;
      const title = document.getElementById('post-title').value.trim();
      const content = document.getElementById('post-content').value.trim();
      const imageUrl = document.getElementById('post-image').value.trim();

      if (!communityId) {
        showToast('Vui lòng chọn một cộng đồng', 'error');
        return;
      }

      if (!title) {
        showToast('Vui lòng nhập tiêu đề bài viết', 'error');
        return;
      }

      try {
        const newPost = window.devStore.createPost({
          communityId,
          title,
          content,
          imageUrl
        });

        showToast('Đăng bài viết thành công!', 'success');
        setTimeout(() => {
          window.location.href = `post.html?id=${newPost.id}`;
        }, 500);
      } catch (err) {
        showToast(err.message || 'Lỗi khi tạo bài viết', 'error');
      }
    });
  }
});
