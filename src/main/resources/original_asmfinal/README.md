# ⚡ CONBOVUIVE GEAR - GAMING GEAR & HIGH-END PC HARDWARE

Website thương mại điện tử chuyên nghiệp cung cấp linh kiện PC, bàn phím cơ Rapid Trigger, chuột gaming siêu nhẹ và GPU cao cấp. Dự án đã được nâng cấp toàn diện từ HTML/CSS tĩnh sang kiến trúc **Node.js (Express) + Tailwind CSS** hiện đại.

---

## 🚀 Cách Chạy Website Nhanh Nhất (1 Click)

### 👉 Cách 1: Chạy bằng file Batch (Khuyên dùng khi chuyển sang máy khác)
- Nhấp đúp chuột vào file **`start.bat`** (hoặc **`run.bat`**).
- File `.bat` sẽ tự động:
  1. Kiểm tra máy tính đã cài **Node.js** chưa. Nếu chưa có, tự động tải và cài đặt Node.js LTS.
  2. Kiểm tra thư viện & plugin trong `node_modules`. Nếu chưa có, tự động chạy `npm install`.
  3. Kiểm tra file giao diện `tailwind.css`. Nếu chưa có, tự động biên dịch Tailwind CSS.
  4. Khởi chạy Server Node.js tại địa chỉ: `http://localhost:3000`.
  5. Tự động mở trình duyệt web lên trang chủ.

### 👉 Cách 2: Chạy bằng dòng lệnh Terminal (PowerShell / CMD)
```bash
# 1. Cài đặt các thư viện phụ thuộc (nếu chưa cài)
npm install

# 2. Biên dịch Tailwind CSS
npm run build:css

# 3. Khởi chạy server
npm start
```
Truy cập trình duyệt tại: **`http://localhost:3000`**

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

| Thành phần | Công nghệ | Mô tả |
| :--- | :--- | :--- |
| **Backend** | **Node.js & Express** | RESTful API quản lý sản phẩm, danh mục, đơn hàng, voucher và phục vụ web |
| **Styling** | **Tailwind CSS v3** | Thiết kế Dark/Gamer Mode, Glassmorphism, animations mượt mà, responsive 100% |
| **Frontend JS** | **ES Modules (Modern JS)** | Xử lý logic giỏ hàng, tìm kiếm thời gian thực, bộ lọc danh mục/hãng, modal chi tiết, auth |
| **Icons & Font** | **FontAwesome 6 & Plus Jakarta Sans** | Font chữ gaming hiện đại, bộ icon trực quan sắc nét |
| **Tự động hóa** | **Windows Batch (.bat)** | Tự động hóa cài đặt môi trường trên máy mới |

---

## ✨ Các Tính Năng Đã Được Nâng Cấp

1. **Giao diện Gamer Cao Cấp (Cyber-Dark Aesthetic)**:
   - Header dạng Glassmorphism sticky mờ với hiệu ứng backdrop-blur.
   - Thanh tìm kiếm nhanh hỗ trợ phím tắt (`Ctrl + K`).
   - Mega Dropdown menu hiển thị danh mục và từng thương hiệu (Logitech, Razer, Wooting, ATK, Mchose, Asus, Colorful, MSI, Zowie, AOC...).

2. **Hero Banner Slider Động**:
   - Tự động chuyển slide sau 4.5 giây (tự dừng khi rê chuột vào).
   - Thanh hiển thị chấm tròn chuyển slide mượt mà, nút qua lại trực quan.

3. **Đếm Ngược Giờ Vàng (Flash Sale Countdown)**:
   - Hiệu ứng đếm ngược thời gian thực theo chu kỳ tạo cảm giác khan hiếm và kích thích mua hàng.

4. **Danh Mục & Bộ Lọc Nâng Cao**:
   - Lọc theo từng danh mục: *Chuột Gaming, Bàn Phím Cơ, Màn Hình, GPU Cao Cấp, Tai Nghe*.
   - Lọc theo từng thương hiệu riêng biệt.
   - Sắp xếp linh hoạt: *Mặc định, Giá tăng dần, Giá giảm dần, Đánh giá cao nhất, Giảm giá nhiều nhất*.
   - Tìm kiếm thời gian thực (Real-time Instant Search) lọc theo tên, thông số và hãng sản xuất.

5. **Xem Nhanh Chi Tiết Sản Phẩm (Quick View Modal)**:
   - Bộ sưu tập ảnh góc chụp (Thumbnail Gallery switch).
   - Bảng thông số kỹ thuật chi tiết (Cảm biến, Switch, Tần số quét, VRAM, Bảo hành...).
   - Trạng thái kho hàng thực tế và điều chỉnh số lượng mua nhanh.

6. **Giỏ Hàng Đa Năng & Hệ Thống Voucher**:
   - Tăng/giảm số lượng từng món ngay trong giỏ hàng.
   - Áp dụng mã giảm giá với các mã có sẵn:
     - `GEARVIP10`: Giảm 10% tổng đơn hàng.
     - `FREESHIP`: Miễn phí vận chuyển.
     - `CHAOBAN`: Giảm 100.000₫ cho khách hàng mới.
     - `CONBOVUIVE`: Giảm 15% đặc quyền thành viên.
   - Tự động miễn phí ship cho đơn từ 2.000.000₫ trở lên.

7. **Quy Trình Đặt Hàng & Lưu Trữ Đơn (Checkout Flow)**:
   - Form điền thông tin người nhận (Họ tên, SĐT, Địa chỉ, Ghi chú, Phương thức COD/QR/Ví điện tử).
   - Đơn hàng được gửi lên API Node.js và lưu vĩnh viễn vào `data/orders.json`.
   - Hiển thị thông báo mã đơn hàng (ví dụ: `#CBV-127772`).

8. **Tài Khoản & Xem Lịch Sử Đơn Hàng**:
   - Đăng nhập / Đăng ký tài khoản người dùng lưu phiên làm việc.
   - Modal xem danh sách lịch sử các đơn hàng đã đặt kèm trạng thái xử lý.

9. **Danh Sách Yêu Thích (Wishlist)**:
   - Nút thả tim lưu sản phẩm yêu thích vào bộ nhớ trình duyệt `localStorage`.

10. **Hệ Thống Thông Báo Nổi (Toast Notifications)**:
    - Hiệu ứng thông báo góc màn hình khi thêm giỏ hàng, áp mã giảm giá, đăng nhập thành công.

---

## 📡 Danh Sách REST API (Node.js)

- `GET /api/products`: Lấy danh sách sản phẩm (hỗ trợ query `?category=...&brand=...&search=...&sort=...`)
- `GET /api/products/:id`: Lấy chi tiết 1 sản phẩm
- `GET /api/categories`: Lấy danh mục và thương hiệu
- `POST /api/voucher/verify`: Kiểm tra và áp dụng mã voucher
- `POST /api/orders`: Tạo mới đơn hàng và lưu vào cơ sở dữ liệu JSON
- `GET /api/orders`: Xem danh sách tất cả đơn hàng
- `GET /api/stats`: Thống kê tổng số sản phẩm, danh mục và đơn hàng

---

## 📁 Cấu Trúc Thư Mục Dự Án (Thuần JavaScript)

```
asmfinal/
│
├── data/
│   ├── products.js             # Dữ liệu mảng JavaScript chứa 18 sản phẩm gear & GPU
│   ├── categories.js           # Dữ liệu mảng JavaScript danh mục & hãng
│   └── orders.js               # Module JavaScript quản lý đơn hàng
│
├── public/
│   ├── css/
│   │   └── tailwind.css        # File Tailwind CSS đã được biên dịch tối ưu
│   ├── js/
│   │   ├── products.js         # Dữ liệu sản phẩm ES Module cho Client
│   │   ├── categories.js       # Dữ liệu danh mục ES Module cho Client
│   │   ├── app.js              # Ứng dụng client chính (Render, Filter, Quick View)
│   │   ├── cart.js             # Quản lý giỏ hàng, voucher, thanh toán
│   │   ├── auth.js             # Quản lý đăng nhập, đăng ký, lịch sử đơn hàng
│   │   └── slider.js           # Xử lý banner slider tự động
│   └── index.html              # Giao diện chính (Tailwind CSS)
│
├── src/
│   └── input.css               # File đầu vào Tailwind CSS & Custom Layers
│
├── server.js                   # Máy chủ Node.js Express & REST API (sử dụng JS modules)
├── tailwind.config.js          # Cấu hình Tailwind CSS (màu gaming, fonts, animations)
├── postcss.config.js           # Cấu hình PostCSS
├── package.json                # Định nghĩa thư viện và scripts npm
├── start.bat                   # File tự động kiểm tra/tải Node.js, cài plugin & chạy app
├── run.bat                     # Phím tắt chạy nhanh website
├── index.html                  # Giao diện đồng bộ tại thư mục gốc
└── README.md                   # Hướng dẫn chi tiết
```

---
*Chúc bạn có trải nghiệm tuyệt vời với Conbovuive Gear!*
