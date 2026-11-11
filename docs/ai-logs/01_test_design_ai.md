# NHẬT KÝ TƯƠNG TÁC AI: THIẾT KẾ TEST PLAN & BỘ TEST CASE CHI TIẾT (Y6 - ĐIỂM A)
> **Môn học:** SOF309 - Kiểm thử nâng cao cùng AI  
> **Sinh viên thực hiện:** Nguyễn Hoàng | **MSSV:** TS02492 | **Lớp:** SD21304  
> **Dự án:** Conbovuive Gear - E-commerce Gaming Gear & PC High-End  
> **Giai đoạn:** Tuần 1 - Hoàn thiện Y1, Y2 và Khởi tạo Nhật ký AI Y6  
> **Ngày thực hiện:** 11/11/2026  

---

## 1. NGỮ CẢNH & MỤC TIÊU (CONTEXT & OBJECTIVES)
* **Ngữ cảnh dự án:**
  Dự án Web Conbovuive Gear đã được tích hợp thành công vào cấu trúc thư mục chuẩn `src/main/` và chạy ổn định ở môi trường cục bộ tại `http://localhost:8080`. File đặc tả nghiệp vụ chi tiết `docs/SPECIFICATIONS.md` đã được biên soạn hoàn chỉnh với đầy đủ các quy tắc xác thực, mã lỗi, ràng buộc validation, danh mục API và bảng ánh xạ Locator phục vụ Selenium POM.
* **Mục tiêu thực hiện:**
  Đóng vai trò là QA Lead / Test Architect, áp dụng quy trình **AI + RAG (Retrieval-Augmented Generation)** để nạp toàn bộ tri thức đặc tả nghiệp vụ từ `docs/SPECIFICATIONS.md` cho AI phân tích, từ đó:
  1. Xây dựng Kế hoạch kiểm thử tổng thể (**Master Test Plan**) chuẩn hóa theo tiêu chuẩn chất lượng của ThS. Trần Quang Bình.
  2. Áp dụng triệt để hai kỹ thuật thiết kế ca kiểm thử hộp đen nâng cao: **Phân vùng tương đương (Equivalence Partitioning - EP)** và **Phân tích giá trị biên (Boundary Value Analysis - BVA)** để thiết lập bộ ma trận ca kiểm thử (**Detailed Test Cases Matrix**) cho cả hai tầng:
     * **Tầng Controller & Service:** Unit Test bằng JUnit 5 với `@ParameterizedTest`, `@CsvSource`, và Exception Testing (`assertThrows`).
     * **Tầng Giao diện người dùng (UI):** Automation Test bằng Selenium WebDriver theo mô hình Page Object Model (POM) kết hợp TestNG Groups (`smoke`, `regression`).
  3. Lưu trữ kết quả chính thức vào `docs/TEST_PLAN.md` và `docs/TEST_CASES.md`.

---

## 2. CÂU LỆNH ĐÃ GỬI CHO AI (PROMPT)

```text
Bạn là QA Lead, dựa trên file đặc tả SPECIFICATIONS.md Hãy áp dụng kỹ thuật Phân vùng tương đương và Phân tích giá trị biên để thiết kế Test Plan và Bộ Test Case chi tiết cho Controller và UI.
```

---

## 3. KẾT QUẢ DO AI SINH RA (RAW OUTPUT SUMMARY)

AI đã xử lý tài liệu đặc tả và phản hồi một bộ tài liệu kiểm thử toàn diện, gồm 2 phần trọng tâm:

### 3.1. Kế hoạch kiểm thử tổng thể (Master Test Plan)
* **Giới thiệu & Mục tiêu:** Xác định 4 cột mốc chất lượng tương ứng với Milestone Y3 (JUnit 5), Y4 (Selenium POM + TestNG), Y5 (CI/CD GitHub Actions Headless) và Y6 (AI Testing Logs).
* **Phạm vi kiểm thử:**
  * *In-Scope:* Toàn bộ 6 phân hệ (Xác thực tài khoản, Quản lý danh mục, Quản lý & CRUD sản phẩm, Động cơ voucher ưu đãi, Giỏ hàng & Tiếp nhận đơn hàng, Thống kê hệ thống).
  * *Out-of-Scope:* Performance Stress Test trên 100k người dùng, Security Pentest phần cứng.
* **Chiến lược & Kỹ thuật:** Quy định rõ các tiêu chuẩn áp dụng EP (phân chia vùng hợp lệ/không hợp lệ), BVA (kiểm tra các điểm biên và cận biên), Exception Testing (bắt ngoại lệ nghiệp vụ), và mô hình Page Object Model độc lập locators.
* **Môi trường & Công cụ:** JDK 17, Spring Boot 3.2.5, Chrome WebDriver, Maven Surefire, GitHub Actions Ubuntu Runner.
* **Tiêu chí nghiệm thu:** 100% test case pass, pipeline CI báo đèn Xanh, không có lỗi nghiêm trọng (Critical Bug).
* **Lộ trình 6 tuần:** Bám sát từng mốc giao bài từ Tuần 1 đến Tuần 6 và buổi bảo vệ trước Giảng viên.

### 3.2. Bộ ma trận ca kiểm thử chi tiết (Test Cases Matrix)
AI thiết kế tổng cộng hơn 45 kịch bản kiểm thử chi tiết được đánh mã định danh chuẩn hóa:
1. **Tầng Controller & Service (Unit Test JUnit 5):**
   * Phân hệ Auth: `TC_AUTH_01` $\rightarrow$ `TC_AUTH_20` (Đăng nhập hợp lệ, sai pass, không tồn tại, để trống; Đăng ký kiểm tra biên độ dài 2, 3, 20, 21 ký tự; Kiểm tra trùng username ném `IllegalStateException`; Email sai định dạng; Password ngắn ném `IllegalArgumentException`; Parameterized Test `@CsvSource`).
   * Phân hệ Sản phẩm: `TC_PROD_01` $\rightarrow$ `TC_PROD_23` (Lấy danh sách, lọc category, lọc brand, tìm kiếm search, lọc khoảng giá, sắp xếp giá/sao; Thêm sản phẩm kiểm tra biên giá $\le 0$, giá = 1₫, tồn kho âm, tồn kho = 0; Trùng tên ném ngoại lệ; Cập nhật sản phẩm; Xóa sản phẩm).
   * Phân hệ Voucher: `TC_VOUCHER_01` $\rightarrow$ `TC_VOUCHER_07` (Kiểm tra 4 mã voucher `GEARVIP10`, `FREESHIP`, `CHAOBAN`, `CONBOVUIVE`; Mã viết thường; Mã không tồn tại báo 404; Mã rỗng báo 400).
   * Phân hệ Đơn hàng: `TC_ORDER_01` $\rightarrow$ `TC_ORDER_08` (Tạo đơn hàng đầy đủ thông tin; Báo lỗi khi thiếu tên, thiếu SĐT, thiếu địa chỉ, giỏ rỗng; Tự sinh mã `CBV-xxxxxx`).
   * Phân hệ Thống kê: `TC_STATS_01` (Kiểm tra số lượng tổng quan).
2. **Tầng Giao diện người dùng (Selenium Automation POM):**
   * Đăng nhập & Xác thực UI: `TC_UI_AUTH_01` $\rightarrow$ `TC_UI_AUTH_06` (Kiểm tra trang `/login`, form submit, thông báo lỗi `#error-message`, Modal Auth trên Header, chuyển đổi tab đăng ký/đăng nhập, đăng xuất).
   * Tìm kiếm & Chi tiết UI: `TC_UI_PROD_01` $\rightarrow$ `TC_UI_PROD_04` (Tìm kiếm ô Search Header, sắp xếp dropdown, mở Modal chi tiết xem specs kỹ thuật).
   * Giỏ hàng & Voucher UI: `TC_UI_CART_01` $\rightarrow$ `TC_UI_CART_05` (Thêm vào giỏ từ Modal, kiểm tra badge `#cartCount`, mở drawer `#cartDrawer`, áp mã voucher hợp lệ/lỗi, mở checkout).
   * Đặt hàng hoàn tất UI: `TC_UI_ORDER_01` $\rightarrow$ `TC_UI_ORDER_03` (Điền form checkout, submit, pop-up đơn hàng thành công `#orderSuccessOverlay`, lấy mã đơn hàng `#successOrderCode`).

---

## 4. CHỈNH SỬA CỦA SINH VIÊN & LÝ DO SỬA (STUDENT REVIEWS & MODIFICATIONS)

Sau khi nhận kết quả ban đầu từ AI, sinh viên **Nguyễn Hoàng (MSSV: TS02492)** đã tiến hành rà soát kỹ lưỡng đối chiếu với mã nguồn thực tế của dự án Conbovuive Gear và đưa ra các điều chỉnh quan trọng sau:

### 4.1. Nhận xét & Những điểm cần hoàn thiện ở bản sinh tự động:
1. **Thiếu tính cụ thể về Exception ném ra:** Phiên bản AI khái quát ban đầu chỉ ghi "Báo lỗi validation", chưa chỉ rõ class ngoại lệ Java cụ thể. Trong mã nguồn của dự án:
   * Trùng tên tài khoản hoặc trùng tên sản phẩm: Hệ thống ném `java.lang.IllegalStateException`.
   * Vi phạm biên độ dài, giá âm, tồn kho âm, email sai: Hệ thống ném `java.lang.IllegalArgumentException`.
   * Không tìm thấy sản phẩm cập nhật: Hệ thống ném `java.util.NoSuchElementException`.  
   $\rightarrow$ **Điều chỉnh:** Bổ sung chính xác tên Class ngoại lệ vào cột *"Ngoại lệ / HTTP Code"* để phục vụ trực tiếp cho hàm `assertThrows()` trong JUnit 5 ở Tuần 2.
2. **Đồng bộ hóa các điểm giá trị biên (BVA) theo đúng code logic:**
   * Trong `AuthService.java`: `username.trim().length() < 3 || username.trim().length() > 20`.  
     $\rightarrow$ Điểm biên cần test chính xác là: 2 ký tự (Lỗi), 3 ký tự (Biên dưới Pass), 20 ký tự (Biên trên Pass), 21 ký tự (Lỗi).
   * Trong `ProductService.java`: `price <= 0` và `stockCount < 0`.  
     $\rightarrow$ Điểm biên giá bán: -1₫ (Lỗi), 0₫ (Lỗi), 1₫ (Biên dưới hợp lệ Pass). Tồn kho: -1 (Lỗi), 0 (Hết hàng Pass), 1 (Còn hàng Pass).
3. **Phân nhóm TestNG chuẩn hóa cho kiểm thử tự động UI:**
   * Bổ sung gắn nhãn nhị phân: `groups = "smoke"` cho các luồng chính quan trọng (Đăng nhập Admin, Thêm giỏ hàng, Checkout thành công) và `groups = "regression"` cho các kịch bản kiểm tra biên và bắt lỗi giao diện.

### 4.2. Quyết định nghiệm thu & Lưu trữ:
* Sinh viên đã phê duyệt bản Test Plan và Test Cases chi tiết hoàn chỉnh.
* Thực hiện lưu đồng bộ vào:
  1. `docs/TEST_PLAN.md` & `TEST_PLAN.md` (Root)
  2. `docs/TEST_CASES.md` & `TEST_CASES.md` (Root)
  3. `docs/ai-logs/01_test_design_ai.md` (File nhật ký hiện tại)
* Toàn bộ tiêu chí nghiệm thu của **Tuần 1 (Milestone Y1, Y2, Y6)** đã được hoàn tất 100%, sẵn sàng bước vào **Tuần 2 (Milestone Y3: Viết Unit Test Controller với JUnit 5)**.
