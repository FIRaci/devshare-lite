/**
 * DevShare Lite - Community Detail Page Logic
 * Môn: Công nghệ Web
 */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const communityName = params.get('name');

  const bannerContainer = document.getElementById('community-banner-container');
  const feedContainer = document.getElementById('community-feed-container');

  if (!communityName) {
    bannerContainer.innerHTML = `
      <div class="empty-state">
        <h3 class="empty-state-title">Chưa chọn cộng đồng</h3>
        <p class="empty-state-desc">Vui lòng chọn một cộng đồng từ thanh điều hướng bên trái.</p>
        <a href="index.html" class="btn btn-primary">Về trang chủ</a>
      </div>
    `;
    return;
  }

  const community = window.devStore.getCommunityByName(communityName);
  if (!community) {
    bannerContainer.innerHTML = `
      <div class="empty-state">
        <h3 class="empty-state-title">Cộng đồng c/${communityName} không tồn tại</h3>
        <p class="empty-state-desc">Bạn có muốn tự tạo cộng đồng này không?</p>
        <a href="create-community.html" class="btn btn-primary">+ Tạo cộng đồng mới</a>
      </div>
    `;
    return;
  }

  document.title = `c/${community.name} - DevShare`;

  // Render Sidebar with active community highlight
  renderSidebar('app-sidebar', community.name);

  // Render Banner
  function updateBanner() {
    bannerContainer.className = 'community-banner';
    bannerContainer.innerHTML = `
      <div>
        <h1 class="community-name">c/${community.name}</h1>
        <p class="community-desc">${community.description}</p>
        <div style="margin-top: 10px; font-size: 0.85rem; color: var(--text-muted);">
          <strong id="member-count-val">${community.member_count}</strong> thành viên tham gia
        </div>
      </div>

      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <button id="join-toggle-btn" class="btn ${community.is_member ? 'btn-outline' : 'btn-primary'} btn-sm">
          ${community.is_member ? 'Đã tham gia (Rời)' : '+ Tham gia'}
        </button>
        <a href="submit.html?c=${community.name}" class="btn btn-teal btn-sm">
          + Đăng bài vào c/${community.name}
        </a>
      </div>
    `;

    const joinBtn = document.getElementById('join-toggle-btn');
    if (joinBtn) {
      joinBtn.onclick = () => {
        const updated = window.devStore.toggleJoinCommunity(community.name);
        if (updated) {
          community.is_member = updated.is_member;
          community.member_count = updated.member_count;
          updateBanner();
          renderSidebar('app-sidebar', community.name);
          showToast(updated.is_member ? `Đã tham gia cộng đồng c/${community.name}` : `Đã rời cộng đồng c/${community.name}`, 'info');
        }
      };
    }
  }

  updateBanner();

  // Render Posts for this community
  renderFeed({
    containerId: 'community-feed-container',
    communityName: community.name,
    emptyTitle: `Chưa có bài viết nào trong c/${community.name}`,
    emptyDesc: 'Hãy là người đầu tiên đặt câu hỏi hoặc chia sẻ bài viết vào đây!'
  });
});
