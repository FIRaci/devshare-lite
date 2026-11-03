/**
 * DevShare Lite - Data Store & LocalStorage Manager
 * Quản lý trạng thái và dữ liệu của ứng dụng mô phỏng cho môn Công nghệ Web
 */

const STORAGE_KEYS = {
  INITIALIZED: 'devshare_initialized',
  CURRENT_USER: 'devshare_current_user',
  COMMUNITIES: 'devshare_communities',
  POSTS: 'devshare_posts',
  COMMENTS: 'devshare_comments',
  NOTIFICATIONS: 'devshare_notifications',
  HIDDEN_POSTS: 'devshare_hidden_posts',
  COMMUNITY_SETTINGS: 'devshare_community_settings'
};

// Dữ liệu mẫu khởi tạo ban đầu
const INITIAL_DATA = {
  currentUser: {
    id: 1,
    username: 'FIRaci',
    name: 'Quốc Thành',
    email: 'firaci.dev@gmail.com',
    profile: {
      bio: 'Sinh viên CNTT đam mê Web Development, UI/UX & Open Source 💻✨',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    },
    followers_count: 128,
    following_count: 45
  },

  communities: [
    {
      id: 1,
      name: 'reactjs',
      description: 'Cộng đồng lập trình viên React, Next.js, Redux và hệ sinh thái UI hiện đại.',
      member_count: 3420,
      is_member: true
    },
    {
      id: 2,
      name: 'javascript',
      description: 'Diễn đàn chuyên sâu về JavaScript thuần, ES6+, Web APIs và kỹ thuật tối ưu hóa.',
      member_count: 8190,
      is_member: true
    },
    {
      id: 3,
      name: 'webdev',
      description: 'Kiến thức chung về Công nghệ Web: HTML5, CSS3, Responsive Design, Accessibility.',
      member_count: 5320,
      is_member: true
    },
    {
      id: 4,
      name: 'python',
      description: 'Học tập và chia sẻ lập trình Python, Django, FastAPI, Data Science & Machine Learning.',
      member_count: 4610,
      is_member: false
    },
    {
      id: 5,
      name: 'devops',
      description: 'Hạ tầng, CI/CD pipelines, Docker, Kubernetes, Cloud (AWS, GCP, Azure).',
      member_count: 2150,
      is_member: false
    },
    {
      id: 6,
      name: 'cong-nghe-web',
      description: 'Góc trao đổi bài tập, đồ án và thảo luận môn Công nghệ Web trường Đại học.',
      member_count: 1420,
      is_member: true
    }
  ],

  posts: [
    {
      id: 1,
      title: 'Hướng dẫn xây dựng Single Page App & Multi Page với HTML, CSS và JavaScript thuần',
      content: `Trong môn **Công nghệ Web**, việc hiểu rõ bản chất của DOM, Event Loop và LocalStorage là nền tảng cực kỳ quan trọng trước khi tiếp cận các framework như React hay Vue.

### 1. Tại sao nên học Vanilla JS trước?
- Không có "ma thuật" ẩn sau virtual DOM.
- Tốc độ tải trang siêu nhanh, không tốn tài nguyên bundling.
- Hiểu sâu về cách trình duyệt render HTML và xử lý CSS.

### 2. Ví dụ về xử lý state đơn giản:
\`\`\`javascript
const state = JSON.parse(localStorage.getItem('app_state')) || {};
function updateState(key, value) {
  state[key] = value;
  localStorage.setItem('app_state', JSON.stringify(state));
  render();
}
\`\`\`

Bạn đã thử làm một ứng dụng hoàn chỉnh không cần backend chưa? Hãy chia sẻ bên dưới nhé!`,
      image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80',
      author: {
        id: 1,
        username: 'FIRaci',
        profile: {
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
        }
      },
      community: {
        id: 6,
        name: 'cong-nghe-web'
      },
      created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 phút trước
      score: 42,
      comment_count: 4,
      user_vote: 1,
      is_saved: true
    },
    {
      id: 2,
      title: 'Flexbox vs CSS Grid: Khi nào nên dùng cái nào trong thiết kế Layout hiện đại?',
      content: `Rất nhiều bạn mới học CSS thường phân vân giữa Flexbox và CSS Grid. Sau đây là quy tắc ngón tay cái (Rule of Thumb) đơn giản nhất:

- **Flexbox (1 chiều)**: Dùng khi bạn muốn sắp xếp các phần tử theo một hàng (row) hoặc một cột (column). Cực kỳ tiện cho Navbar, Button groups, danh sách thẻ.
- **CSS Grid (2 chiều)**: Dùng khi bạn thiết kế toàn bộ bố cục trang (Header, Sidebar, Main Content, Footer) có cả hàng lẫn cột đồng thời.

\`\`\`css
/* Grid cho tổng thể trang */
.app-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
}

/* Flexbox cho thanh điều hướng */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

Anh em trong nhóm thường dùng layout nào cho đồ án cuối kỳ?`,
      image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80',
      author: {
        id: 2,
        username: 'alex_frontend',
        profile: {
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
        }
      },
      community: {
        id: 3,
        name: 'webdev'
      },
      created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 giờ trước
      score: 87,
      comment_count: 6,
      user_vote: null,
      is_saved: false
    },
    {
      id: 3,
      title: 'Tổng hợp 10 tính năng ES2023 - ES2024 của JavaScript mà lập trình viên nên biết',
      content: `JavaScript ngày càng phát triển mạnh mẽ. Dưới đây là những tính năng mới giúp code sạch và dễ đọc hơn rất nhiều:

1. **Array.prototype.toSorted()**: Sắp xếp mảng mà không làm biến đổi mảng gốc (immutable).
2. **Array.prototype.findLast()**: Tìm phần tử thỏa điều kiện từ cuối mảng ngược về đầu.
3. **Object.groupBy()**: Nhóm danh sách các đối tượng theo thuộc tính cực kỳ tiện lợi mà không cần Reduce phức tạp.

\`\`\`javascript
const students = [
  { name: 'Minh', grade: 'A' },
  { name: 'Lan', grade: 'B' },
  { name: 'Hoàng', grade: 'A' }
];

const grouped = Object.groupBy(students, s => s.grade);
console.log(grouped);
\`\`\`

Các bạn đã áp dụng những cú pháp này vào dự án thực tế chưa?`,
      image_url: '',
      author: {
        id: 3,
        username: 'dev_guru',
        profile: {
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
        }
      },
      community: {
        id: 2,
        name: 'javascript'
      },
      created_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 giờ trước
      score: 115,
      comment_count: 5,
      user_vote: 1,
      is_saved: false
    },
    {
      id: 4,
      title: 'So sánh React Server Components (RSC) và Client Components trong thực tế',
      content: `Next.js App Router mang lại mô hình React Server Components với rất nhiều ưu điểm về dung lượng JavaScript bundle và SEO.

> "RSC cho phép render component trên server mà không cần gửi JS của component đó về client."

### Điểm khác biệt mấu chốt:
- **Server Component**: Mặc định trong App Router, có thể trực tiếp fetch database, giấu API keys, nhưng không dùng được hook như \`useState\` hay \`useEffect\`.
- **Client Component**: Cần khai báo \`'use client'\`, dùng cho các tương tác người dùng như click, form input, state thay đổi.`,
      image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900&auto=format&fit=crop&q=80',
      author: {
        id: 4,
        username: 'react_ninja',
        profile: {
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
        }
      },
      community: {
        id: 1,
        name: 'reactjs'
      },
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 giờ trước
      score: 64,
      comment_count: 2,
      user_vote: null,
      is_saved: true
    }
  ],

  comments: [
    {
      id: 1,
      postId: 1,
      author: {
        id: 2,
        username: 'alex_frontend',
        profile: {
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
        }
      },
      content: 'Bài viết rất hữu ích cho các bạn sinh viên làm đồ án môn Web! Dùng LocalStorage mô phỏng DB rất mượt mà.',
      created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString()
    },
    {
      id: 2,
      postId: 1,
      author: {
        id: 3,
        username: 'dev_guru',
        profile: {
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
        }
      },
      content: 'Rất đồng ý! Nắm vững JavaScript thuần giúp debug các lỗi logic trong React dễ dàng hơn gấp 10 lần.',
      created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString()
    },
    {
      id: 3,
      postId: 1,
      author: {
        id: 1,
        username: 'FIRaci',
        profile: {
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
        }
      },
      content: 'Cảm ơn mọi người đã ủng hộ! Dự án này tôi làm thuần bằng HTML/CSS/JS cho đồ án nộp thầy cô chấm điểm.',
      created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString()
    },
    {
      id: 4,
      postId: 2,
      author: {
        id: 1,
        username: 'FIRaci',
        profile: {
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
        }
      },
      content: 'Chuẩn luôn, mình hay kết hợp CSS Grid cho container chính và Flexbox cho thanh điều hướng Navbar.',
      created_at: new Date(Date.now() - 1000 * 60 * 75).toISOString()
    }
  ],

  notifications: [
    {
      id: 1,
      actor: { username: 'alex_frontend' },
      verb: 'đã thích bài viết của bạn',
      target_id: 1,
      target_title: 'Hướng dẫn xây dựng Single Page App...',
      is_read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    },
    {
      id: 2,
      actor: { username: 'dev_guru' },
      verb: 'đã bình luận về bài viết của bạn',
      target_id: 1,
      target_title: 'Hướng dẫn xây dựng Single Page App...',
      is_read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
    },
    {
      id: 3,
      actor: { username: 'react_ninja' },
      verb: 'đã bắt đầu theo dõi bạn',
      target_id: 0,
      target_title: '',
      is_read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
    }
  ],

  hiddenPostIds: []
};

// Khởi tạo State trong LocalStorage
class DevShareStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
      this.resetToDefaults();
    }
  }

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_DATA.currentUser));
    localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(INITIAL_DATA.communities));
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_DATA.posts));
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(INITIAL_DATA.comments));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_DATA.notifications));
    localStorage.setItem(STORAGE_KEYS.HIDDEN_POSTS, JSON.stringify(INITIAL_DATA.hiddenPostIds));
  }

  // --- Current User ---
  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) || INITIAL_DATA.currentUser;
    } catch (e) {
      return INITIAL_DATA.currentUser;
    }
  }

  updateUserProfile({ name, bio, avatar }) {
    const user = this.getCurrentUser();
    if (name) user.name = name;
    if (bio !== undefined) user.profile.bio = bio;
    if (avatar) user.profile.avatar = avatar;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return user;
  }

  // --- Communities ---
  getCommunities() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMUNITIES)) || [];
    } catch (e) {
      return [];
    }
  }

  getCommunityByName(name) {
    const communities = this.getCommunities();
    return communities.find(c => c.name.toLowerCase() === (name || '').toLowerCase());
  }

  createCommunity({ name, description }) {
    const communities = this.getCommunities();
    const cleanName = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9_-]/g, '');
    
    if (communities.some(c => c.name === cleanName)) {
      throw new Error(`Cộng đồng 'c/${cleanName}' đã tồn tại!`);
    }

    const newCommunity = {
      id: Date.now(),
      name: cleanName,
      description: description.trim() || `Cộng đồng trao đổi về ${cleanName}`,
      member_count: 1,
      is_member: true
    };

    communities.push(newCommunity);
    localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(communities));
    return newCommunity;
  }

  toggleJoinCommunity(name) {
    const communities = this.getCommunities();
    const community = communities.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (community) {
      community.is_member = !community.is_member;
      community.member_count += community.is_member ? 1 : -1;
      localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(communities));
      return community;
    }
    return null;
  }

  // --- Posts ---
  getHiddenPostIds() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.HIDDEN_POSTS)) || [];
    } catch (e) {
      return [];
    }
  }

  hidePost(postId) {
    const hidden = this.getHiddenPostIds();
    if (!hidden.includes(Number(postId))) {
      hidden.push(Number(postId));
      localStorage.setItem(STORAGE_KEYS.HIDDEN_POSTS, JSON.stringify(hidden));
    }
  }

  getPosts({ filter = 'all', communityName = null, authorName = null, search = null } = {}) {
    let posts = [];
    try {
      posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    } catch (e) {
      posts = [];
    }

    const hiddenIds = this.getHiddenPostIds();
    posts = posts.filter(p => !hiddenIds.includes(p.id));

    // Lọc theo community
    if (communityName) {
      posts = posts.filter(p => p.community.name.toLowerCase() === communityName.toLowerCase());
    }

    // Lọc theo author
    if (authorName) {
      posts = posts.filter(p => p.author.username.toLowerCase() === authorName.toLowerCase());
    }

    // Lọc theo kiểu feed
    if (filter === 'home') {
      const joinedCommunities = this.getCommunities()
        .filter(c => c.is_member)
        .map(c => c.name.toLowerCase());
      posts = posts.filter(p => joinedCommunities.includes(p.community.name.toLowerCase()));
    } else if (filter === 'saved') {
      posts = posts.filter(p => p.is_saved);
    }

    // Tìm kiếm
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.content.toLowerCase().includes(q) ||
        p.community.name.toLowerCase().includes(q) ||
        p.author.username.toLowerCase().includes(q)
      );
    }

    // Mặc định sắp xếp theo ngày mới nhất
    return posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  getPostById(id) {
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    return posts.find(p => p.id === Number(id));
  }

  createPost({ title, content, communityId, imageUrl = '' }) {
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const communities = this.getCommunities();
    const community = communities.find(c => c.id === Number(communityId));

    if (!community) {
      throw new Error('Vui lòng chọn một cộng đồng hợp lệ.');
    }

    const currentUser = this.getCurrentUser();
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      image_url: imageUrl.trim() || '',
      author: {
        id: currentUser.id,
        username: currentUser.username,
        profile: {
          avatar: currentUser.profile.avatar
        }
      },
      community: {
        id: community.id,
        name: community.name
      },
      created_at: new Date().toISOString(),
      score: 1,
      comment_count: 0,
      user_vote: 1,
      is_saved: false
    };

    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return newPost;
  }

  updatePost(id, { title, content }) {
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const index = posts.findIndex(p => p.id === Number(id));
    if (index === -1) throw new Error('Không tìm thấy bài viết');

    posts[index].title = title.trim();
    posts[index].content = content.trim();
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return posts[index];
  }

  deletePost(id) {
    let posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    posts = posts.filter(p => p.id !== Number(id));
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));

    // Xóa cả comments tương ứng
    let comments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS)) || [];
    comments = comments.filter(c => c.postId !== Number(id));
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  }

  votePost(postId, action) {
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const post = posts.find(p => p.id === Number(postId));
    if (!post) return null;

    const currentVote = post.user_vote;
    let newScore = post.score;
    let newVote = null;

    if (action === 'upvote') {
      if (currentVote === 1) {
        newScore -= 1;
        newVote = null;
      } else if (currentVote === -1) {
        newScore += 2;
        newVote = 1;
      } else {
        newScore += 1;
        newVote = 1;
      }
    } else if (action === 'downvote') {
      if (currentVote === -1) {
        newScore += 1;
        newVote = null;
      } else if (currentVote === 1) {
        newScore -= 2;
        newVote = -1;
      } else {
        newScore -= 1;
        newVote = -1;
      }
    }

    post.score = newScore;
    post.user_vote = newVote;
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return { score: newScore, user_vote: newVote };
  }

  toggleSavePost(postId) {
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const post = posts.find(p => p.id === Number(postId));
    if (!post) return false;

    post.is_saved = !post.is_saved;
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return post.is_saved;
  }

  // --- Comments ---
  getComments(postId) {
    try {
      const comments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS)) || [];
      return comments
        .filter(c => c.postId === Number(postId))
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } catch (e) {
      return [];
    }
  }

  addComment(postId, content) {
    const comments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS)) || [];
    const currentUser = this.getCurrentUser();

    const newComment = {
      id: Date.now(),
      postId: Number(postId),
      author: {
        id: currentUser.id,
        username: currentUser.username,
        profile: {
          avatar: currentUser.profile.avatar
        }
      },
      content: content.trim(),
      created_at: new Date().toISOString()
    };

    comments.push(newComment);
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));

    // Cập nhật comment_count trong bài viết
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const post = posts.find(p => p.id === Number(postId));
    if (post) {
      post.comment_count = (post.comment_count || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    }

    return newComment;
  }

  // --- Notifications ---
  getNotifications() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) || [];
    } catch (e) {
      return [];
    }
  }

  markNotificationsAsRead() {
    const notifications = this.getNotifications();
    notifications.forEach(n => n.is_read = true);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }

  // --- Search Suggestions ---
  getSuggestions(query) {
    if (!query || query.trim().length < 2) {
      return { posts: [], communities: [] };
    }
    const q = query.trim().toLowerCase();
    const posts = (JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [])
      .filter(p => p.title.toLowerCase().includes(q))
      .slice(0, 4)
      .map(p => ({ id: p.id, title: p.title, community_name: p.community.name }));

    const communities = this.getCommunities()
      .filter(c => c.name.toLowerCase().includes(q))
      .slice(0, 4)
      .map(c => ({ id: c.id, name: c.name }));

    return { posts, communities };
  }
}

// Global instance
window.devStore = new DevShareStore();

// Tiện ích format thời gian (tương tự date-fns formatDistanceToNow)
function formatTimeAgo(isoDate) {
  if (!isoDate) return '';
  const seconds = Math.floor((new Date() - new Date(isoDate)) / 1000);
  if (seconds < 60) return 'vừa xong';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ngày trước`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} tháng trước`;
  return `${Math.floor(days / 365)} năm trước`;
}

// Bộ phân tích cú pháp Markdown an toàn đơn giản
function renderMarkdown(text) {
  if (!text) return '';
  
  // Xử lý escape HTML cơ bản để chống XSS
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code block: ```language\n code \n```
  escaped = escaped.replace(/```([a-z0-9]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre class="code-block"><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // Inline code: `code`
  escaped = escaped.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Headings: ###, ##, #
  escaped = escaped.replace(/^### (.*$)/gim, '<h3 class="md-h3">$1</h3>');
  escaped = escaped.replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>');
  escaped = escaped.replace(/^# (.*$)/gim, '<h1 class="md-h1">$1</h1>');

  // Blockquotes: > quote
  escaped = escaped.replace(/^> (.*$)/gim, '<blockquote class="md-quote">$1</blockquote>');

  // Bold & Italic
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  escaped = escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Images: ![alt](url)
  escaped = escaped.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, '<img class="md-image" src="$2" alt="$1" loading="lazy" />');

  // Links: [text](url)
  escaped = escaped.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="md-link">$1</a>');

  // Lists: - item
  escaped = escaped.replace(/^\- (.*$)/gim, '<li class="md-li">$1</li>');

  // Paragraphs
  escaped = escaped.replace(/\n\n+/g, '</p><p>');
  escaped = `<p>${escaped}</p>`;

  // Fix lists wrap
  escaped = escaped.replace(/(<li class="md-li">.*<\/li>)/g, '<ul class="md-ul">$1</ul>');
  escaped = escaped.replace(/<\/ul>\s*<ul class="md-ul">/g, '');

  return escaped;
}
