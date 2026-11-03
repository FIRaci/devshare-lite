# 🌐 DevShare Lite - Nền Tảng Chia Sẻ Kiến Thức Lập Trình

> **Đồ án môn học:** Công nghệ Web  
> **Phiên bản:** 1.0.0 (Lite - Pure HTML/CSS/JS)  
> **Tác giả:** [FIRaci](https://github.com/FIRaci)  
> **Repository:** [https://github.com/FIRaci/devshare-lite](https://github.com/FIRaci/devshare-lite)

---

## 📖 Giới thiệu dự án

**DevShare Lite** là một diễn đàn thảo luận và chia sẻ kiến thức dành cho lập trình viên (lấy cảm hứng từ giao diện Reddit và Dev.to). Dự án được chuyển đổi từ phiên bản gốc Next.js / TypeScript / Chakra UI sang **100% HTML5, CSS3 và Vanilla JavaScript thuần**, tuân thủ triệt để yêu cầu của môn học Công nghệ Web: **không phụ thuộc vào bất kỳ framework hoặc thư viện build tool phức tạp nào**.

Ứng dụng chạy trực tiếp trên trình duyệt, sử dụng **HTML5 Web Storage (LocalStorage)** để mô phỏng cơ sở dữ liệu hoàn chỉnh, giúp toàn bộ các tương tác từ vote, bình luận, tạo bài viết, tạo cộng đồng, tìm kiếm đến lưu bài đều diễn ra mượt mà và lưu trữ bền vững.

---

## ✨ Các tính năng nổi bật

### 1. Giao diện & Trải nghiệm (UI/UX)
- Thiết kế hiện đại, tinh gọn chuẩn phong cách Chakra UI với hệ màu sắc dịu mắt (xanh dương, xám nhạt, cam điểm nhấn).
- **Responsive 100%**: Tương thích tốt trên cả máy tính (Sidebar cố định) và điện thoại di động (Menu trượt Drawer).
- **Hệ thống Toast Notification**: Thông báo nổi góc màn hình mỗi khi người dùng thực hiện một thao tác.
- **Hộp thoại xác nhận (Modal)**: Xác nhận an toàn khi xóa bài viết, rời cộng đồng hoặc đặt lại dữ liệu.

### 2. Hệ thống Bảng tin (Feed)
- **Bảng tin cá nhân (Của bạn)**: Chỉ hiển thị các bài viết thuộc các cộng đồng mà người dùng đã nhấn "Tham gia".
- **Khám phá tất cả**: Hiển thị toàn bộ bài viết trên diễn đàn, sắp xếp theo thời gian mới nhất.
- **Cơ chế tính điểm Vote**: Upvote (+1) hiển thị màu cam, Downvote (-1) hiển thị màu xanh, hỗ trợ toggle hủy vote.
- **Lưu bài viết (Bookmark)**: Lưu bài viết yêu thích vào danh sách riêng (`saved.html`).
- **Ẩn bài viết**: Ẩn bài viết không mong muốn khỏi bảng tin.
- **Chia sẻ liên kết**: Sao chép nhanh URL bài viết vào bộ nhớ tạm (Clipboard).

### 3. Chi tiết bài viết & Bình luận (Post & Comments)
- Hiển thị bài viết chi tiết kèm tiêu đề, thông tin tác giả, thời gian đăng theo dạng tương đối (*35 phút trước, 2 giờ trước...*).
- **Bộ hiển thị Markdown tích hợp**: Tự động render tiêu đề, in đậm, in nghiêng, trích dẫn, ảnh minh họa và các khối mã nguồn (`code block`) cú pháp chuẩn.
- **Bình luận thời gian thực**: Người dùng có thể viết và gửi bình luận ngay lập tức; số lượng bình luận được tự động cập nhật.
- **Quyền tác giả**: Nếu là bài viết của chính người dùng, hiển thị thêm nút **Chỉnh sửa** (`edit-post.html`) và **Xóa bài viết**.

### 4. Đăng & Chỉnh sửa bài viết
- Form tạo bài viết (`submit.html`) với chọn cộng đồng, nhập tiêu đề, nội dung Markdown và link ảnh minh họa.
- Tích hợp nút **Xem trước Markdown** trực tiếp trước khi xuất bản.
- Hỗ trợ chọn nhanh các ảnh minh họa mẫu về công nghệ.

### 5. Quản lý Cộng đồng (Communities)
- Xem trang chi tiết cộng đồng (`community.html?name=...`) gồm banner, mô tả, số lượng thành viên và danh sách bài viết thuộc cộng đồng đó.
- Nút **Tham gia / Rời khỏi** cộng đồng tức thì.
- Trang **Tạo cộng đồng mới** (`create-community.html`) với tính năng tự chuẩn hóa slug (tên viết thường không dấu).
- Trang **Cài đặt cộng đồng** (`settings-communities.html`) quản lý các cộng đồng đã tham gia kèm công tắc bật/tắt nhận thông báo.

### 6. Tìm kiếm thông minh (Smart Search)
- **Autocomplete & Gợi ý tức thì**: Gợi ý nhanh bài viết và cộng đồng ngay khi gõ từ khóa vào thanh tìm kiếm trên Navbar.
- **Kỹ thuật Debounce**: Trì hoãn xử lý sự kiện gõ phím giúp giao diện phản hồi mượt mà, tối ưu hiệu năng.
- Trang kết quả tìm kiếm chi tiết (`search.html?q=...`) hiển thị cả cộng đồng và bài viết liên quan.

### 7. Trang cá nhân & Hồ sơ (User Profile)
- Xem thông tin tài khoản, ảnh đại diện, tiểu sử (bio), số người theo dõi và danh sách các bài viết do user đó đăng.
- Trang chỉnh sửa hồ sơ (`settings-profile.html`) cập nhật tên hiển thị, bio và link avatar.
- Nút **Đặt lại dữ liệu mẫu (Reset Data)**: Cho phép thầy cô / người chấm bài dễ dàng khôi phục lại dữ liệu mẫu ban đầu bất kỳ lúc nào chỉ với 1 click.

---

## 📁 Cấu trúc thư mục dự án

```text
devshare-lite/
├── index.html                  # Trang chủ (Bảng tin cá nhân & Tất cả bài viết)
├── post.html                   # Xem chi tiết bài viết & Bình luận
├── submit.html                 # Đăng bài viết mới
├── edit-post.html              # Chỉnh sửa bài viết
├── community.html              # Trang chi tiết cộng đồng
├── create-community.html       # Tạo cộng đồng mới
├── profile.html                # Trang hồ sơ cá nhân tác giả
├── saved.html                  # Danh sách các bài viết đã lưu
├── search.html                 # Trang kết quả tìm kiếm
├── settings-profile.html       # Cài đặt thông tin cá nhân
├── settings-communities.html   # Quản lý cài đặt các cộng đồng đã tham gia
├── favicon.ico                 # Icon trang web
├── css/
│   └── style.css               # Toàn bộ stylesheet (Chakra UI styling system)
├── js/
│   ├── data.js                 # LocalStorage Data Store & Bộ phân tích Markdown
│   ├── main.js                 # Shared UI (Navbar, Sidebar, Mobile Drawer, Toast, Modal)
│   ├── feed.js                 # Component PostCard, Vote, Lưu, Ẩn & Render feed
│   ├── post-detail.js          # Logic xem chi tiết & gửi bình luận
│   ├── submit.js               # Logic form tạo bài & xem trước markdown
│   └── community.js            # Logic trang cộng đồng & tham gia/rời
└── README.md                   # Báo cáo và tài liệu hướng dẫn
```

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy

Dự án hoàn toàn tĩnh (Static Web), không cần cài đặt Node.js, npm hay bất kỳ package nào!

### Cách 1: Chạy trực tiếp (Đơn giản nhất)
1. Tải repository về máy hoặc clone:
   ```bash
   git clone https://github.com/FIRaci/devshare-lite.git
   ```
2. Mở thư mục dự án, nhấp đúp chuột vào file `index.html` để mở ngay trên trình duyệt (Google Chrome, Microsoft Edge, Firefox, Safari...).

### Cách 2: Sử dụng VS Code Live Server (Khuyên dùng)
1. Mở thư mục dự án bằng **Visual Studio Code**.
2. Cài đặt tiện ích mở rộng **Live Server** (nếu chưa có).
3. Nhấp chuột phải vào file `index.html` và chọn **"Open with Live Server"** (phím tắt `Alt + L, Alt + O`).
4. Dự án sẽ mở tại địa chỉ `http://127.0.0.1:5500/index.html`.

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Mục đích sử dụng |
|-----------|------------------|
| **HTML5** | Xây dựng cấu trúc Semantic Web (`header`, `main`, `aside`, `article`, `section`...) |
| **CSS3** | Flexbox, CSS Grid, CSS Variables, Transitions, Box Shadows, Media Queries Responsive |
| **JavaScript (ES6+)** | DOM Manipulation, Event Delegation, LocalStorage API, Debouncing, Regular Expressions |
| **Unsplash Images** | Hình ảnh minh họa chất lượng cao cho avatar và bài viết |

---

## 👨‍💻 Tác giả

- **Họ và tên:** [FIRaci / Quốc Thành](https://github.com/FIRaci)
- **Môn học:** Công nghệ Web
- **GitHub:** [https://github.com/FIRaci](https://github.com/FIRaci)
