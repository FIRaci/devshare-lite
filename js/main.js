/**
 * DevShare Lite - Main Shared Layout & Interactions
 * Môn: Công nghệ Web
 */

// Toast notification helper
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2500);
}

// Modal confirmation helper
function showConfirmModal({ title, message, confirmText = 'Xác nhận', confirmClass = 'btn-danger', onConfirm }) {
  let modalOverlay = document.getElementById('global-confirm-modal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'global-confirm-modal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-box">
        <h3 class="modal-title" id="modal-title-text"></h3>
        <p class="modal-body" id="modal-body-text"></p>
        <div class="modal-footer">
          <button class="btn btn-outline" id="modal-cancel-btn">Hủy</button>
          <button class="btn" id="modal-confirm-btn"></button>
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
  }

  document.getElementById('modal-title-text').textContent = title;
  document.getElementById('modal-body-text').textContent = message;
  
  const confirmBtn = document.getElementById('modal-confirm-btn');
  confirmBtn.className = `btn ${confirmClass}`;
  confirmBtn.textContent = confirmText;

  const cancelBtn = document.getElementById('modal-cancel-btn');

  const close = () => {
    modalOverlay.classList.remove('active');
  };

  cancelBtn.onclick = close;
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) close();
  };

  confirmBtn.onclick = () => {
    close();
    if (typeof onConfirm === 'function') onConfirm();
  };

  modalOverlay.classList.add('active');
}

// Render Header & Navbar
function renderNavbar() {
  const navContainer = document.getElementById('app-navbar');
  if (!navContainer) return;

  const user = window.devStore.getCurrentUser();
  const notifications = window.devStore.getNotifications();
  const unreadCount = notifications.filter(n => !n.is_read).length;

  navContainer.className = 'navbar';
  navContainer.innerHTML = `
    <div class="container navbar-inner">
      <div class="nav-left">
        <button class="menu-toggle-btn" id="hamburger-btn" title="Menu Cộng đồng">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <a href="index.html" class="brand-logo">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
          <span class="brand-text">DevShare</span>
          <span class="brand-badge">Lite</span>
        </a>
      </div>

      <div class="nav-search" id="nav-search-container">
        <form id="navbar-search-form" action="search.html" method="GET">
          <div class="search-input-wrapper">
            <span class="search-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input 
              type="text" 
              name="q" 
              id="search-input" 
              class="search-input" 
              placeholder="Tìm kiếm bài viết, cộng đồng..." 
              autocomplete="off"
            />
          </div>
        </form>
        <div class="search-suggestions-dropdown" id="search-suggestions"></div>
      </div>

      <div class="nav-right">
        <!-- Thông báo -->
        <div class="relative">
          <button class="icon-btn" id="notif-btn" title="Thông báo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            ${unreadCount > 0 ? `<span class="badge-unread" id="notif-badge">${unreadCount}</span>` : ''}
          </button>
          
          <div class="popover-menu" id="notif-menu">
            <div class="popover-header">
              <span>Thông báo</span>
              <button class="btn btn-ghost btn-sm" id="mark-read-btn">Đã đọc hết</button>
            </div>
            <div class="popover-list" id="notif-list"></div>
          </div>
        </div>

        <!-- Nút Tạo bài viết -->
        <a href="submit.html" class="btn btn-primary btn-create-post">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Tạo bài viết</span>
        </a>

        <!-- User Menu -->
        <div class="relative">
          <div class="user-avatar-btn" id="user-menu-btn" title="Tài khoản">
            <img src="${user.profile.avatar}" alt="${user.username}" class="avatar-img" />
          </div>

          <div class="dropdown-menu" id="user-dropdown">
            <div style="padding: 10px 16px; border-bottom: 1px solid var(--border-color);">
              <div style="font-weight: 700; font-size: 0.9rem;">${user.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">u/${user.username}</div>
            </div>
            <a href="profile.html">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Trang cá nhân
            </a>
            <a href="saved.html">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              Bài viết đã lưu
            </a>
            <a href="settings-communities.html">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Quản lý cộng đồng
            </a>
            <a href="settings-profile.html">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Cài đặt hồ sơ
            </a>
            <div class="dropdown-divider"></div>
            <button id="reset-data-btn" style="color: var(--danger);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
              Đặt lại dữ liệu mẫu
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Init Navbar events
  initNavbarEvents();
}

// Events for navbar dropdowns, notifications, and search debounce
function initNavbarEvents() {
  const notifBtn = document.getElementById('notif-btn');
  const notifMenu = document.getElementById('notif-menu');
  const notifList = document.getElementById('notif-list');
  const markReadBtn = document.getElementById('mark-read-btn');
  const userMenuBtn = document.getElementById('user-menu-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const resetBtn = document.getElementById('reset-data-btn');

  // Toggle Notifications
  if (notifBtn && notifMenu) {
    notifBtn.onclick = (e) => {
      e.stopPropagation();
      userDropdown?.classList.remove('active');
      const isActive = notifMenu.classList.toggle('active');
      if (isActive) {
        renderNotificationItems();
      }
    };
  }

  // Mark all notifications read
  if (markReadBtn) {
    markReadBtn.onclick = (e) => {
      e.stopPropagation();
      window.devStore.markNotificationsAsRead();
      const badge = document.getElementById('notif-badge');
      if (badge) badge.remove();
      renderNotificationItems();
      showToast('Đã đánh dấu đọc tất cả thông báo', 'success');
    };
  }

  // Toggle User dropdown
  if (userMenuBtn && userDropdown) {
    userMenuBtn.onclick = (e) => {
      e.stopPropagation();
      notifMenu?.classList.remove('active');
      userDropdown.classList.toggle('active');
    };
  }

  // Click outside to close dropdowns
  document.addEventListener('click', () => {
    notifMenu?.classList.remove('active');
    userDropdown?.classList.remove('active');
    document.getElementById('search-suggestions')?.classList.remove('active');
  });

  // Search input autocomplete with debounce
  const searchInput = document.getElementById('search-input');
  const searchSuggestions = document.getElementById('search-suggestions');
  let debounceTimeout = null;

  if (searchInput && searchSuggestions) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimeout);
      const query = e.target.value.trim();
      if (query.length < 2) {
        searchSuggestions.classList.remove('active');
        return;
      }

      debounceTimeout = setTimeout(() => {
        const results = window.devStore.getSuggestions(query);
        renderSearchSuggestions(results, searchSuggestions);
      }, 200);
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length >= 2) {
        const results = window.devStore.getSuggestions(searchInput.value.trim());
        renderSearchSuggestions(results, searchSuggestions);
      }
    });

    searchSuggestions.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Reset database button
  if (resetBtn) {
    resetBtn.onclick = () => {
      showConfirmModal({
        title: 'Khôi phục dữ liệu ban đầu?',
        message: 'Thao tác này sẽ xóa các bài viết, bình luận bạn vừa tạo và đưa hệ thống về danh sách mẫu ban đầu.',
        confirmText: 'Đặt lại',
        onConfirm: () => {
          window.devStore.resetToDefaults();
          showToast('Đã khôi phục dữ liệu mẫu thành công!', 'success');
          setTimeout(() => window.location.reload(), 600);
        }
      });
    };
  }

  // Mobile Hamburger Menu
  const hamburgerBtn = document.getElementById('hamburger-btn');
  if (hamburgerBtn) {
    hamburgerBtn.onclick = toggleMobileDrawer;
  }
}

function renderNotificationItems() {
  const notifList = document.getElementById('notif-list');
  if (!notifList) return;

  const notifications = window.devStore.getNotifications();
  if (notifications.length === 0) {
    notifList.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">Không có thông báo mới</div>`;
    return;
  }

  notifList.innerHTML = notifications.map(n => `
    <div class="popover-item ${n.is_read ? '' : 'unread'}">
      <div><strong>${n.actor.username}</strong> ${n.verb} ${n.target_title ? `<em>"${n.target_title}"</em>` : ''}</div>
      <div class="popover-time">${formatTimeAgo(n.timestamp)}</div>
    </div>
  `).join('');
}

function renderSearchSuggestions({ posts, communities }, container) {
  if (posts.length === 0 && communities.length === 0) {
    container.innerHTML = `<div style="padding: 10px; font-size: 0.85rem; color: var(--text-muted);">Không tìm thấy kết quả phù hợp</div>`;
    container.classList.add('active');
    return;
  }

  let html = '';
  if (communities.length > 0) {
    html += `<div class="suggestion-group-title">Cộng đồng</div>`;
    communities.forEach(c => {
      html += `
        <a href="community.html?name=${c.name}" class="suggestion-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
          <span>c/<strong>${c.name}</strong></span>
        </a>
      `;
    });
  }

  if (posts.length > 0) {
    html += `<div class="suggestion-group-title">Bài viết</div>`;
    posts.forEach(p => {
      html += `
        <a href="post.html?id=${p.id}" class="suggestion-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.title}</span>
        </a>
      `;
    });
  }

  container.innerHTML = html;
  container.classList.add('active');
}

// Render Sidebar
function renderSidebar(targetId = 'app-sidebar', activeCommunity = null) {
  const sidebar = document.getElementById(targetId);
  if (!sidebar) return;

  const communities = window.devStore.getCommunities();

  sidebar.className = 'sidebar';
  sidebar.innerHTML = `
    <div class="sidebar-title">Cộng đồng lập trình</div>
    <div class="community-list">
      ${communities.map(c => `
        <a href="community.html?name=${c.name}" class="community-link ${activeCommunity === c.name ? 'active' : ''}">
          <span>c/${c.name}</span>
          <span class="community-badge">${c.member_count}</span>
        </a>
      `).join('')}
    </div>
    <a href="create-community.html" class="btn btn-teal btn-sm" style="width: 100%;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      Tạo cộng đồng
    </a>
  `;
}

// Mobile Drawer
function createMobileDrawer() {
  if (document.getElementById('mobile-drawer-overlay')) return;

  const drawerOverlay = document.createElement('div');
  drawerOverlay.id = 'mobile-drawer-overlay';
  drawerOverlay.className = 'mobile-drawer-overlay';

  const communities = window.devStore.getCommunities();

  drawerOverlay.innerHTML = `
    <div class="mobile-drawer" id="mobile-drawer">
      <div class="drawer-header">
        <a href="index.html" class="brand-logo">
          <span>DevShare</span>
        </a>
        <button class="icon-btn" id="drawer-close-btn">✕</button>
      </div>

      <div style="margin-bottom: 20px;">
        <a href="submit.html" class="btn btn-primary" style="width: 100%; margin-bottom: 8px;">+ Đăng bài viết</a>
        <a href="create-community.html" class="btn btn-teal" style="width: 100%;">+ Tạo cộng đồng</a>
      </div>

      <div class="sidebar-title">Danh sách cộng đồng</div>
      <div class="community-list">
        ${communities.map(c => `
          <a href="community.html?name=${c.name}" class="community-link">
            <span>c/${c.name}</span>
            <span class="community-badge">${c.member_count}</span>
          </a>
        `).join('')}
      </div>

      <div style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px;">
        <div class="sidebar-title">Cá nhân</div>
        <a href="profile.html" class="community-link">Trang cá nhân</a>
        <a href="saved.html" class="community-link">Bài viết đã lưu</a>
        <a href="settings-profile.html" class="community-link">Cài đặt tài khoản</a>
      </div>
    </div>
  `;

  document.body.appendChild(drawerOverlay);

  document.getElementById('drawer-close-btn').onclick = toggleMobileDrawer;
  drawerOverlay.onclick = (e) => {
    if (e.target === drawerOverlay) toggleMobileDrawer();
  };
}

function toggleMobileDrawer() {
  createMobileDrawer();
  const overlay = document.getElementById('mobile-drawer-overlay');
  overlay?.classList.toggle('active');
}

// Global initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderSidebar();
  createMobileDrawer();
});
