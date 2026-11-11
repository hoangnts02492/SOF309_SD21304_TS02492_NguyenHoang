# BỘ KỊCH BẢN KIỂM THỬ CHI TIẾT (DETAILED TEST CASES MATRIX)
> **DỰ ÁN: CONBOVUIVE GEAR - WEBSITE THƯƠNG MẠI ĐIỆN TỬ GAMING GEAR & PHẦN CỨNG PC**  
> **Môn học:** SOF309 - Kiểm thử nâng cao cùng AI  
> **Sinh viên thực hiện:** Nguyễn Hoàng | **MSSV:** TS02492 | **Lớp:** SD21304  
> **Giảng viên hướng dẫn:** ThS. Trần Quang Bình (binhtq7 - Thầy Mời Giáo)  
> **Kỹ thuật thiết kế chủ đạo:** Phân vùng tương đương (EP) & Phân tích giá trị biên (BVA)  

---

## BẢNG KÝ HIỆU & QUY ƯỚC VIẾT TẮT
* **EP:** Equivalence Partitioning (Phân vùng tương đương)
* **BVA:** Boundary Value Analysis (Phân tích giá trị biên)
* **EXP:** Exception Testing (`assertThrows`)
* **PARAM:** Parameterized Testing (`@ParameterizedTest` + `@CsvSource`)
* **Pos / Neg:** Positive Test (Ca kiểm thử tích cực) / Negative Test (Ca kiểm thử tiêu cực)

---

## PHẦN I. BỘ TEST CASE CHO TẦNG CONTROLLER & SERVICE (UNIT TEST - JUNIT 5)

### 1. Phân hệ Xác thực & Quản lý Người dùng (`AuthController` & `AuthService`)

| Test Case ID | Chức năng | Kỹ thuật áp dụng | Loại test | Mô tả ca kiểm thử | Dữ liệu kiểm thử (Test Data) | Các bước thực hiện | Kết quả mong đợi | Ngoại lệ / HTTP Code |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: |
| **TC_AUTH_01** | Login | EP | Pos | Đăng nhập thành công với tài khoản quản trị mặc định | `username = "admin"`<br>`password = "123"` | 1. Gọi `authController.authenticate(u, p)`<br>2. Kiểm tra kết quả trả về | Trả về `true`, xác thực hợp lệ | `200 OK` |
| **TC_AUTH_02** | Login | EP | Pos | Đăng nhập thành công với tài khoản sinh viên cá nhân | `username = "hoangnguyen"`<br>`password = "12345678@A"` | 1. Gọi `authController.authenticate(u, p)`<br>2. Kiểm tra kết quả trả về | Trả về `true`, xác thực hợp lệ | `200 OK` |
| **TC_AUTH_03** | Login | EP | Pos | Đăng nhập không phân biệt chữ hoa chữ thường của username | `username = "ADMIN"`<br>`password = "123"` | 1. Gọi `authController.authenticate(u, p)`<br>2. So khớp username | Trả về `true` (equalsIgnoreCase) | `200 OK` |
| **TC_AUTH_04** | Login | EP | Neg | Đăng nhập thất bại do sai mật khẩu | `username = "admin"`<br>`password = "WrongPassword"` | 1. Gọi `authController.authenticate(u, p)` | Trả về `false` | `401 Unauthorized` |
| **TC_AUTH_05** | Login | EP | Neg | Đăng nhập thất bại do tài khoản không tồn tại | `username = "non_existent_user"`<br>`password = "123"` | 1. Gọi `authController.authenticate(u, p)` | Trả về `false` | `401 Unauthorized` |
| **TC_AUTH_06** | Login | BVA | Neg | Đăng nhập thất bại khi để trống mật khẩu (Biên rỗng) | `username = "admin"`<br>`password = ""` | 1. Gọi `authController.authenticate("admin", "")` | Trả về `false` | `400 Bad Request` |
| **TC_AUTH_07** | Login | BVA | Neg | Đăng nhập thất bại khi để trống cả user và pass | `username = ""` / `password = ""` | 1. Gọi `authController.authenticate("", "")` | Trả về `false` | `400 Bad Request` |
| **TC_AUTH_08** | Login | BVA | Neg | Đăng nhập thất bại khi chỉ chứa khoảng trắng | `username = "   "`<br>`password = "   "` | 1. Gọi `authController.authenticate("   ", "   ")` | Trả về `false` | `400 Bad Request` |
| **TC_AUTH_09** | Login | PARAM | Pos/Neg | Quét ma trận kiểm thử biên Form bằng Parameterized Test | `@CsvSource` nạp 6 bộ dữ liệu biên (Valid, Invalid, Empty, Spaces) | 1. Chạy `@ParameterizedTest`<br>2. `assertEquals(expected, actual)` | Kết quả khớp 100% với kỳ vọng từng dòng | `200 OK` / `401` |
| **TC_AUTH_10** | Register | EP | Pos | Đăng ký thành viên mới với dữ liệu hợp lệ | `username = "gamer2026"`<br>`email = "gamer@gmail.com"`<br>`pass = "Pass123"`<br>`confirm = "Pass123"` | 1. Khởi tạo `RegisterRequest`<br>2. Gọi `authService.register(req)` | Tạo thành công user có ID `usr-04`, role `USER` | `201 Created` |
| **TC_AUTH_11** | Register | BVA / EXP | Neg | Đăng ký thất bại khi username có độ dài = 2 (Cận dưới biên: < 3 ký tự) | `username = "ab"` (2 ký tự)<br>`email = "valid@gmail.com"`<br>`pass = "123"` | 1. Gọi `authService.register(req)`<br>2. `assertThrows()` | Ném ngoại lệ thông báo: `"Tên đăng nhập phải từ 3 đến 20 ký tự"` | `IllegalArgumentException` |
| **TC_AUTH_12** | Register | BVA | Pos | Đăng ký thành công với username có độ dài = 3 (Điểm biên dưới hợp lệ) | `username = "abc"` (3 ký tự)<br>`email = "abc@gmail.com"`<br>`pass = "123"` | 1. Gọi `authService.register(req)` | Tạo tài khoản thành công | `201 Created` |
| **TC_AUTH_13** | Register | BVA | Pos | Đăng ký thành công với username có độ dài = 20 (Điểm biên trên hợp lệ) | `username = "abcdefghij1234567890"` (20 ký tự)<br>`email = "len20@gmail.com"` | 1. Gọi `authService.register(req)` | Tạo tài khoản thành công | `201 Created` |
| **TC_AUTH_14** | Register | BVA / EXP | Neg | Đăng ký thất bại khi username có độ dài = 21 (Cận trên biên: > 20 ký tự) | `username = "abcdefghij12345678901"` (21 ký tự) | 1. Gọi `authService.register(req)`<br>2. `assertThrows()` | Ném ngoại lệ thông báo: `"Tên đăng nhập phải từ 3 đến 20 ký tự"` | `IllegalArgumentException` |
| **TC_AUTH_15** | Register | EP / EXP | Neg | Đăng ký thất bại khi tài khoản trùng lặp đã tồn tại | `username = "admin"` (Đã có sẵn)<br>`email = "new@gmail.com"` | 1. Gọi `authService.register(req)`<br>2. `assertThrows()` | Ném ngoại lệ: `"Tên tài khoản 'admin' đã được sử dụng"` | `IllegalStateException` (409) |
| **TC_AUTH_16** | Register | EP / EXP | Neg | Đăng ký thất bại khi email sai cấu trúc chuẩn | `username = "newuser"`<br>`email = "sai-dinh-dang-email"` | 1. Gọi `authService.register(req)`<br>2. `assertThrows()` | Ném ngoại lệ: `"Email không đúng định dạng hợp lệ"` | `IllegalArgumentException` |
| **TC_AUTH_17** | Register | BVA / EXP | Neg | Đăng ký thất bại khi mật khẩu quá ngắn (< 3 ký tự) | `username = "newuser"`<br>`password = "12"` (2 ký tự) | 1. Gọi `authService.register(req)`<br>2. `assertThrows()` | Ném ngoại lệ: `"Mật khẩu không được để trống hoặc quá ngắn"` | `IllegalArgumentException` |
| **TC_AUTH_18** | Register | EP / EXP | Neg | Đăng ký thất bại khi xác nhận mật khẩu không trùng khớp | `password = "Password@123"`<br>`confirmPassword = "KhacPassword"` | 1. Gọi `authService.register(req)`<br>2. `assertThrows()` | Ném ngoại lệ: `"Xác nhận mật khẩu không trùng khớp"` | `IllegalArgumentException` |
| **TC_AUTH_19** | Profile | EP | Pos | Lấy thông tin hồ sơ tài khoản tồn tại trong hệ thống | `username = "hoangnguyen"` | 1. Gọi `authController.getProfile("hoangnguyen")` | Trả về thông tin họ tên, email của sinh viên | `200 OK` |
| **TC_AUTH_20** | Profile | EP | Neg | Lấy thông tin hồ sơ tài khoản không tồn tại | `username = "user_khong_ton_tai"` | 1. Gọi `authController.getProfile("...")` | Trả về thông báo `"Không tìm thấy người dùng"` | `404 Not Found` |

---

### 2. Phân hệ Quản lý & Tra cứu Sản phẩm (`ProductController` & `ProductService`)

| Test Case ID | Chức năng | Kỹ thuật áp dụng | Loại test | Mô tả ca kiểm thử | Dữ liệu kiểm thử (Test Data) | Các bước thực hiện | Kết quả mong đợi | Ngoại lệ / HTTP Code |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: |
| **TC_PROD_01** | Get All | EP | Pos | Tải toàn bộ danh sách sản phẩm mặc định ban đầu | Không truyền tham số query | 1. Gọi `productController.getProducts(null, null, ...)` | Trả về tổng cộng `total = 16` sản phẩm | `200 OK` |
| **TC_PROD_02** | Filter | EP | Pos | Lọc sản phẩm theo nhóm danh mục Chuột Gaming | `category = "mouse"` | 1. Gọi lọc với `category = "mouse"` | Trả về đúng 4 sản phẩm chuột (Logitech, Razer, ATK, Mchose) | `200 OK` |
| **TC_PROD_03** | Filter | EP | Pos | Lọc sản phẩm theo nhóm danh mục Bàn Phím Cơ | `category = "keyboard"` | 1. Gọi lọc với `category = "keyboard"` | Trả về đúng 4 bàn phím (Wooting, ATK, Mchose, Razer) | `200 OK` |
| **TC_PROD_04** | Filter | EP | Pos | Lọc sản phẩm theo thương hiệu cụ thể | `brand = "Logitech"` | 1. Gọi lọc với `brand = "Logitech"` | Toàn bộ sản phẩm trả về đều mang thương hiệu Logitech | `200 OK` |
| **TC_PROD_05** | Search | EP | Pos | Tìm kiếm sản phẩm theo từ khóa chính xác | `search = "Wooting"` | 1. Gọi lọc với `search = "Wooting"` | Trả về sản phẩm bàn phím Wooting 60HE+ | `200 OK` |
| **TC_PROD_06** | Search | EP | Neg | Tìm kiếm sản phẩm với từ khóa không tồn tại | `search = "TuKhoaKhongCoTrongKho"` | 1. Gọi lọc với từ khóa lạ | Trả về danh sách rỗng (`total = 0`) | `200 OK` |
| **TC_PROD_07** | Price Range | BVA | Pos | Lọc sản phẩm trong khoảng giá từ 1 triệu đến 5 triệu | `minPrice = 1000000`<br>`maxPrice = 5000000` | 1. Gọi lọc với khoảng giá quy định | 100% sản phẩm trả về có giá $1M \le price \le 5M$ | `200 OK` |
| **TC_PROD_08** | Sort | EP | Pos | Sắp xếp sản phẩm theo giá tăng dần | `sort = "price-asc"` | 1. Gọi với tham số `sort = "price-asc"` | Sản phẩm đầu tiên có giá thấp nhất (Mchose A5 - 1.090.000₫) | `200 OK` |
| **TC_PROD_09** | Sort | EP | Pos | Sắp xếp sản phẩm theo giá giảm dần | `sort = "price-desc"` | 1. Gọi với tham số `sort = "price-desc"` | Sản phẩm đầu tiên có giá cao nhất (RTX 5090 - 62.900.000₫) | `200 OK` |
| **TC_PROD_10** | Detail | EP | Pos | Lấy thông tin chi tiết sản phẩm theo mã ID có sẵn | `id = "cbv-01"` | 1. Gọi `productController.getProductById("cbv-01")` | Trả về đúng sản phẩm Logitech G Pro X Superlight 2 | `200 OK` |
| **TC_PROD_11** | Detail | EP | Neg | Lấy thông tin sản phẩm theo mã ID không tồn tại | `id = "cbv-999"` | 1. Gọi `productController.getProductById("cbv-999")` | Trả về lỗi: `"Không tìm thấy sản phẩm"` | `404 Not Found` |
| **TC_PROD_12** | Create | EP | Pos | Thêm mới một sản phẩm hợp lệ vào kho hàng | `name = "Tai nghe HyperX Cloud 3"`<br>`price = 2490000`<br>`stockCount = 20` | 1. Khởi tạo đối tượng `Product`<br>2. Gọi `productService.addProduct(p)` | Thêm thành công, tự sinh ID `cbv-17` | `201 Created` |
| **TC_PROD_13** | Create | BVA / EXP | Neg | Thêm mới sản phẩm thất bại do giá bán bằng 0 (Điểm biên không hợp lệ) | `name = "Chuột giá 0 đồng"`<br>`price = 0`<br>`stockCount = 10` | 1. Gọi `productService.addProduct(p)`<br>2. `assertThrows()` | Ném ngoại lệ: `"Giá bán sản phẩm phải lớn hơn 0"` | `IllegalArgumentException` |
| **TC_PROD_14** | Create | BVA / EXP | Neg | Thêm mới sản phẩm thất bại do giá bán âm (Cận dưới biên) | `name = "Chuột giá âm"`<br>`price = -50000`<br>`stockCount = 10` | 1. Gọi `productService.addProduct(p)`<br>2. `assertThrows()` | Ném ngoại lệ: `"Giá bán sản phẩm phải lớn hơn 0"` | `IllegalArgumentException` |
| **TC_PROD_15** | Create | BVA | Pos | Thêm mới sản phẩm thành công với giá bán bằng 1₫ (Biên dưới hợp lệ) | `name = "Sticker Gaming 1 đồng"`<br>`price = 1`<br>`stockCount = 5` | 1. Gọi `productService.addProduct(p)` | Thêm sản phẩm thành công | `201 Created` |
| **TC_PROD_16** | Create | BVA / EXP | Neg | Thêm mới sản phẩm thất bại do số lượng tồn kho âm | `name = "Chuột tồn kho âm"`<br>`price = 500000`<br>`stockCount = -1` | 1. Gọi `productService.addProduct(p)`<br>2. `assertThrows()` | Ném ngoại lệ: `"Số lượng tồn kho không được âm"` | `IllegalArgumentException` |
| **TC_PROD_17** | Create | BVA | Pos | Thêm mới sản phẩm thành công với tồn kho = 0 (Trạng thái hết hàng) | `name = "Hàng sắp về kho"`<br>`price = 1000000`<br>`stockCount = 0` | 1. Gọi `productService.addProduct(p)` | Thêm thành công sản phẩm với `stockCount = 0` | `201 Created` |
| **TC_PROD_18** | Create | EP / EXP | Neg | Thêm mới sản phẩm thất bại do để trống tên sản phẩm | `name = ""` / `name = "   "`<br>`price = 500000` | 1. Gọi `productService.addProduct(p)`<br>2. `assertThrows()` | Ném ngoại lệ: `"Tên sản phẩm không được để trống"` | `IllegalArgumentException` |
| **TC_PROD_19** | Create | EP / EXP | Neg | Thêm mới sản phẩm thất bại do trùng tên với hàng đã có | `name = "Logitech G Pro X Superlight 2"` (Đã có sẵn) | 1. Gọi `productService.addProduct(p)`<br>2. `assertThrows()` | Ném ngoại lệ: `"Sản phẩm với tên '...' đã tồn tại"` | `IllegalStateException` |
| **TC_PROD_20** | Update | EP | Pos | Cập nhật thông tin giá và tồn kho của sản phẩm tồn tại | `id = "cbv-01"`<br>`newPrice = 3290000`<br>`newStock = 50` | 1. Gọi `productService.updateProduct("cbv-01", updated)` | Giá và tồn kho của sản phẩm `cbv-01` được cập nhật mới | `200 OK` |
| **TC_PROD_21** | Update | EP / EXP | Neg | Cập nhật sản phẩm thất bại do mã ID không tồn tại | `id = "cbv-999"` | 1. Gọi `productService.updateProduct("cbv-999", ...)` | Ném ngoại lệ: `"Không tìm thấy sản phẩm có mã: cbv-999"` | `NoSuchElementException` |
| **TC_PROD_22** | Delete | EP | Pos | Xóa sản phẩm thành công khỏi kho hàng | `id = "cbv-16"` (Zotac RTX 4060) | 1. Gọi `productController.deleteProduct("cbv-16")` | Trả về thông điệp `"Xóa sản phẩm thành công"`, tổng giảm 1 | `200 OK` |
| **TC_PROD_23** | Delete | EP | Neg | Xóa sản phẩm thất bại do mã ID không tồn tại | `id = "cbv-khong-ton-tai"` | 1. Gọi `productController.deleteProduct("...")` | Trả về mã lỗi 404 `"Không tìm thấy sản phẩm để xóa"` | `404 Not Found` |

---

### 3. Phân hệ Động cơ Khuyến mãi & Mã giảm giá (`VoucherController` & `VoucherService`)

| Test Case ID | Chức năng | Kỹ thuật áp dụng | Loại test | Mô tả ca kiểm thử | Dữ liệu kiểm thử (Test Data) | Các bước thực hiện | Kết quả mong đợi | Ngoại lệ / HTTP Code |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: |
| **TC_VOUCHER_01** | Verify | EP | Pos | Xác thực mã giảm 10% hợp lệ | `code = "GEARVIP10"` | 1. Gọi `voucherController.verifyVoucher(req)` | Trả về `isValid: true`, `discountPercent: 10`, `freeShipping: false` | `200 OK` |
| **TC_VOUCHER_02** | Verify | EP | Pos | Xác thực mã miễn phí giao hàng toàn quốc | `code = "FREESHIP"` | 1. Gọi `voucherController.verifyVoucher(req)` | Trả về `isValid: true`, `freeShipping: true`, cước ship = 0₫ | `200 OK` |
| **TC_VOUCHER_03** | Verify | EP | Pos | Xác thực mã giảm 100.000₫ tiền mặt | `code = "CHAOBAN"` | 1. Gọi `voucherController.verifyVoucher(req)` | Trả về `isValid: true`, `discountAmount: 100000` | `200 OK` |
| **TC_VOUCHER_04** | Verify | EP | Pos | Xác thực mã thành viên đặc quyền giảm 15% | `code = "CONBOVUIVE"` | 1. Gọi `voucherController.verifyVoucher(req)` | Trả về `isValid: true`, `discountPercent: 15` | `200 OK` |
| **TC_VOUCHER_05** | Verify | EP | Pos | Xác thực mã voucher viết thường (Không phân biệt hoa/thường) | `code = "gearvip10"` / `code = "freeship"` | 1. Gọi `voucherController.verifyVoucher(req)` | Hệ thống tự chuyển `toUpperCase()` và trả về `isValid: true` | `200 OK` |
| **TC_VOUCHER_06** | Verify | EP | Neg | Xác thực thất bại khi nhập mã không tồn tại | `code = "DISCOUNT999"` | 1. Gọi `voucherController.verifyVoucher(req)` | Trả về `isValid: false`, `"Mã giảm giá không hợp lệ hoặc đã hết hạn!"` | `404 Not Found` |
| **TC_VOUCHER_07** | Verify | BVA | Neg | Xác thực thất bại khi để trống mã voucher (Biên rỗng) | `code = ""` / `code = "   "` | 1. Gọi `voucherController.verifyVoucher(req)` | Trả về lỗi: `"Vui lòng nhập mã giảm giá"` | `400 Bad Request` |

---

### 4. Phân hệ Giỏ hàng & Tiếp nhận Đơn hàng (`OrderController` & `OrderService`)

| Test Case ID | Chức năng | Kỹ thuật áp dụng | Loại test | Mô tả ca kiểm thử | Dữ liệu kiểm thử (Test Data) | Các bước thực hiện | Kết quả mong đợi | Ngoại lệ / HTTP Code |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: |
| **TC_ORDER_01** | Create | EP | Pos | Đặt hàng thành công khi điền đầy đủ thông tin hợp lệ | Khách: Nguyễn Văn A, SĐT: `0912345678`, ĐC: Cầu Giấy HN.<br>Giỏ: 1 chuột Superlight 2 | 1. Tạo đối tượng `Order`<br>2. Gửi `POST /api/orders` | Tạo thành công đơn hàng có ID dạng `CBV-xxxxxx`, trạng thái `"Chờ xác nhận"` | `201 Created` |
| **TC_ORDER_02** | Create | EP | Neg | Đặt hàng thất bại khi thiếu họ tên người nhận | `name = ""` / `null` | 1. Gửi request đặt hàng thiếu tên | Báo lỗi `"Vui lòng điền đầy đủ thông tin giao hàng và giỏ hàng"` | `400 Bad Request` |
| **TC_ORDER_03** | Create | EP | Neg | Đặt hàng thất bại khi thiếu số điện thoại người nhận | `phone = ""` / `null` | 1. Gửi request đặt hàng thiếu SĐT | Báo lỗi `"Vui lòng điền đầy đủ thông tin giao hàng và giỏ hàng"` | `400 Bad Request` |
| **TC_ORDER_04** | Create | EP | Neg | Đặt hàng thất bại khi thiếu địa chỉ giao hàng | `address = ""` / `null` | 1. Gửi request đặt hàng thiếu địa chỉ | Báo lỗi `"Vui lòng điền đầy đủ thông tin giao hàng và giỏ hàng"` | `400 Bad Request` |
| **TC_ORDER_05** | Create | BVA | Neg | Đặt hàng thất bại khi giỏ hàng rỗng (Biên: 0 sản phẩm) | `items = Collections.emptyList()` | 1. Gửi request đặt hàng với giỏ rỗng | Báo lỗi `"Vui lòng điền đầy đủ thông tin giao hàng và giỏ hàng"` | `400 Bad Request` |
| **TC_ORDER_06** | Get All | EP | Pos | Lấy danh sách lịch sử toàn bộ đơn hàng | Không tham số | 1. Gọi `orderController.getAllOrders()` | Trả về danh sách đơn hàng đã đặt thành công (Mới nhất lên đầu) | `200 OK` |
| **TC_ORDER_07** | Detail | EP | Pos | Xem chi tiết đơn hàng theo mã tồn tại | `id = "{ma_don_vua_tao}"` | 1. Gọi `orderController.getOrderById(id)` | Trả về chi tiết đơn hàng tương ứng | `200 OK` |
| **TC_ORDER_08** | Detail | EP | Neg | Xem chi tiết đơn hàng theo mã không tồn tại | `id = "CBV-000000"` | 1. Gọi `orderController.getOrderById("CBV-000000")` | Trả về thông báo `"Không tìm thấy đơn hàng"` | `404 Not Found` |

---

### 5. Phân hệ Thống kê Hệ thống (`StatsController`)

| Test Case ID | Chức năng | Kỹ thuật áp dụng | Loại test | Mô tả ca kiểm thử | Dữ liệu kiểm thử | Các bước thực hiện | Kết quả mong đợi | Ngoại lệ / HTTP Code |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: |
| **TC_STATS_01** | Get Stats | EP | Pos | Lấy thống kê tổng quan toàn bộ số liệu hệ thống | Không tham số | 1. Gọi `statsController.getStats()` | Trả về `totalProducts: 16`, `totalCategories: 5`, số lượng `totalOrders`, `hotCount > 0` | `200 OK` |

---

## PHẦN II. BỘ TEST CASE CHO TẦNG GIAO DIỆN (AUTOMATION UI TEST - SELENIUM POM)

### 1. Kiểm thử Giao diện Đăng nhập & Xác thực (`LoginPage.java` & Modal Auth)

| Test Case ID | Màn hình / Modal | Nhóm Test | Loại test | Mô tả kịch bản kiểm thử | Dữ liệu đầu vào (Test Data) | Thao tác tự động hóa (Selenium Steps) | Kết quả mong đợi trên giao diện |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **TC_UI_AUTH_01** | Trang `/login` | `smoke` | Pos | Kiểm tra đăng nhập thành công với tài khoản Admin | `username = "admin"`<br>`password = "123"` | 1. Mở `http://localhost:8080/login`<br>2. `loginPage.login("admin", "123")` | Trình duyệt chuyển hướng về trang chủ `http://localhost:8080/` |
| **TC_UI_AUTH_02** | Trang `/login` | `regression` | Neg | Kiểm tra đăng nhập thất bại do nhập sai mật khẩu | `username = "admin"`<br>`password = "SaiMatKhau"` | 1. Mở `/login`<br>2. Nhập user đúng, pass sai<br>3. Bấm Submit | Thẻ `#error-message` hiển thị nội dung: `"Tài khoản hoặc mật khẩu không chính xác"` |
| **TC_UI_AUTH_03** | Trang `/login` | `regression` | Neg | Kiểm tra đăng nhập thất bại do bỏ trống thông tin | `username = ""` / `password = ""` | 1. Mở `/login`<br>2. Bấm nút Submit ngay | Trình duyệt kích hoạt tooltip HTML5 `required`, không gửi request |
| **TC_UI_AUTH_04** | Modal Auth | `smoke` | Pos | Đăng nhập thành công từ Modal Pop-up trên Trang chủ | `email = "hoangnguyen"`<br>`password = "12345678@A"` | 1. Mở Trang chủ `/`<br>2. Bấm `#accountBtn`<br>3. Nhập email/pass<br>4. Bấm Đăng nhập | Modal tự đóng; Thẻ `#accountLabel` đổi từ "Tài khoản" thành "hoangnguyen" |
| **TC_UI_AUTH_05** | Modal Auth | `regression` | Pos | Chuyển đổi qua lại giữa form Đăng nhập và Đăng ký | Click `#switchToRegister`<br>Click `#switchToLogin` | 1. Bấm link `#switchToRegister`<br>2. Bấm link `#switchToLogin` | `#loginFormContainer` ẩn, `#registerFormContainer` hiện và ngược lại |
| **TC_UI_AUTH_06** | Header | `regression` | Pos | Đăng xuất tài khoản người dùng | Click `#accountBtn`<br>Click `#logoutBtn` | 1. Bấm `#accountBtn` mở menu<br>2. Bấm `#logoutBtn` | Session bị xóa, Header trở về trạng thái Guest ("Tài khoản") |

---

### 2. Kiểm thử Tìm kiếm, Bộ lọc & Xem chi tiết sản phẩm

| Test Case ID | Màn hình / Modal | Nhóm Test | Loại test | Mô tả kịch bản kiểm thử | Dữ liệu đầu vào (Test Data) | Thao tác tự động hóa (Selenium Steps) | Kết quả mong đợi trên giao diện |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **TC_UI_PROD_01** | Trang chủ | `smoke` | Pos | Tìm kiếm sản phẩm theo từ khóa trên ô Search Header | Từ khóa: `"Logitech"` | 1. Click `#searchInput`<br>2. Gõ `"Logitech"` và Enter | Lưới `#productGrid` chỉ hiển thị các sản phẩm thuộc thương hiệu Logitech |
| **TC_UI_PROD_02** | Trang chủ | `regression` | Pos | Sắp xếp sản phẩm theo giá tăng dần | Chọn option `"price-asc"` | 1. Chọn giá trị `price-asc` tại `#sortSelect` | Sản phẩm đầu tiên trên lưới có giá hiển thị thấp nhất |
| **TC_UI_PROD_03** | Modal Detail | `smoke` | Pos | Mở Modal xem thông số kỹ thuật chi tiết sản phẩm | Click vào thẻ sản phẩm đầu tiên | 1. Click vào ảnh/tên sản phẩm trên grid | Modal `#detailModalOverlay` mở ra; hiển thị đúng `#modalTitle`, `#modalPrice`, bảng `#modalSpecsTable` |
| **TC_UI_PROD_04** | Modal Detail | `regression` | Pos | Đóng Modal chi tiết sản phẩm | Click nút `#closeDetailBtn` | 1. Bấm nút dấu x `#closeDetailBtn` | Modal `#detailModalOverlay` đóng lại, trở về màn hình duyệt hàng |

---

### 3. Kiểm thử Giỏ hàng & Áp dụng Voucher Khuyến mãi

| Test Case ID | Màn hình / Modal | Nhóm Test | Loại test | Mô tả kịch bản kiểm thử | Dữ liệu đầu vào (Test Data) | Thao tác tự động hóa (Selenium Steps) | Kết quả mong đợi trên giao diện |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **TC_UI_CART_01** | Modal Detail | `smoke` | Pos | Thêm sản phẩm vào giỏ hàng từ Modal chi tiết | Số lượng: `1` | 1. Mở modal chi tiết<br>2. Bấm nút `#modalAddToCartBtn` | Hiển thị Toast thông báo thành công; Badge `#cartCount` tăng lên 1 |
| **TC_UI_CART_02** | Khay Giỏ hàng | `smoke` | Pos | Mở khay trượt giỏ hàng kiểm tra sản phẩm | Click `#cartToggleBtn` | 1. Bấm biểu tượng giỏ hàng trên Header | Khay `#cartDrawer` trượt ra từ bên phải; `#cartItemsContainer` chứa đúng sản phẩm vừa chọn |
| **TC_UI_CART_03** | Khay Giỏ hàng | `regression` | Pos | Áp dụng mã giảm giá 10% hợp lệ | Mã: `"GEARVIP10"` | 1. Nhập `"GEARVIP10"` vào `#voucherInput`<br>2. Bấm `#applyVoucherBtn` | Dòng `#voucherDiscountRow` hiện số tiền giảm; `#cartTotal` giảm tương ứng 10% |
| **TC_UI_CART_04** | Khay Giỏ hàng | `regression` | Neg | Áp dụng mã giảm giá không tồn tại | Mã: `"VOUCHERSAI"` | 1. Nhập `"VOUCHERSAI"`<br>2. Bấm `#applyVoucherBtn` | Thẻ `#voucherMsg` hiển thị cảnh báo đỏ: `"Mã giảm giá không hợp lệ hoặc đã hết hạn!"` |
| **TC_UI_CART_05** | Khay Giỏ hàng | `smoke` | Pos | Bấm nút Thanh toán mở màn hình Checkout | Click `#checkoutBtn` | 1. Bấm nút `#checkoutBtn` | Khay giỏ hàng đóng lại; Modal `#checkoutModalOverlay` mở ra |

---

### 4. Kiểm thử Điền thông tin giao hàng & Hoàn tất Đơn hàng

| Test Case ID | Màn hình / Modal | Nhóm Test | Loại test | Mô tả kịch bản kiểm thử | Dữ liệu đầu vào (Test Data) | Thao tác tự động hóa (Selenium Steps) | Kết quả mong đợi trên giao diện |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **TC_UI_ORDER_01** | Modal Checkout | `smoke` | Pos | Đặt hàng thành công với đầy đủ thông tin giao nhận | Tên: `"Nguyễn Hoàng"`<br>SĐT: `"0987654321"`<br>ĐC: `"Hà Nội"` | 1. Điền Tên, SĐT, Địa chỉ<br>2. Bấm Xác nhận Đặt hàng | Modal `#orderSuccessOverlay` hiển thị; Mã `#successOrderCode` có dạng `#CBV-xxxxxx`; Giỏ hàng được làm sạch về 0 |
| **TC_UI_ORDER_02** | Modal Checkout | `regression` | Neg | Bỏ trống số điện thoại nhận hàng khi đặt hàng | Tên: `"Nguyễn Hoàng"`<br>SĐT: `""` (Rỗng) | 1. Để trống ô `#orderCustomerPhone`<br>2. Bấm Xác nhận | Trình duyệt chặn submit bằng HTML5 validation trên input SĐT |
| **TC_UI_ORDER_03** | Modal Thành công | `smoke` | Pos | Đóng Modal thành công quay về tiếp tục mua sắm | Click nút Đóng | 1. Bấm nút đóng modal thành công | Modal ẩn đi; Người dùng trở về màn hình Trang chủ ở trạng thái sẵn sàng mua hàng mới |
