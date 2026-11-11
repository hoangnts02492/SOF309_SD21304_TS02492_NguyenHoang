package com.poly.sof309.controllers;

import com.poly.sof309.models.Product;
import com.poly.sof309.models.RegisterRequest;
import com.poly.sof309.services.AuthService;
import com.poly.sof309.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.*;

/**
 * =========================================================================
 * [Y3] FILE TEST MẪU BẰNG JUNIT 5 CHO CONTROLLER & SERVICE
 * Tích hợp trực tiếp mã nguồn Controller/Service của Conbovuive Gear.
 * Áp dụng Parameterized Test và Exception Testing chuẩn yêu cầu Tuần 2.
 * =========================================================================
 */
public class SampleControllerTest {

    private AuthService authService;
    private AuthController authController;
    private ProductService productService;

    @BeforeEach
    public void setUp() {
        authService = new AuthService();
        authController = new AuthController(authService);
        productService = new ProductService();
    }

    @Test
    @DisplayName("TC_AUTH_01: Kiểm tra đăng nhập với thông tin hợp lệ")
    public void testLoginSuccess() {
        String username = "admin";
        String password = "123";

        boolean isValidUser = authController.authenticate(username, password);
        assertTrue(isValidUser, "Đăng nhập phải thành công với tài khoản đúng");
    }

    @Test
    @DisplayName("TC_AUTH_02: Kiểm tra đăng nhập thất bại khi để trống mật khẩu")
    public void testLoginEmptyPassword() {
        String username = "admin";
        String password = "";

        boolean isValidUser = authController.authenticate(username, password);
        assertFalse(isValidUser, "Đăng nhập phải thất bại khi mật khẩu trống");
    }

    @ParameterizedTest(name = "TC_AUTH_PARAM_{index}: Test login username=''{0}'', password=''{1}'' -> expected={2}")
    @CsvSource({
            "admin, 123, true",
            "hoangnguyen, 12345678@A, true",
            "wronguser, 123, false",
            "admin, wrongpass, false",
            "'', '', false",
            "'   ', '   ', false"
    })
    @DisplayName("TC_AUTH_03: Parameterized Test kiểm tra biên form đăng nhập")
    public void testLoginParameterized(String username, String password, boolean expectedResult) {
        boolean result = authController.authenticate(username, password);
        assertEquals(expectedResult, result);
    }

    @Test
    @DisplayName("TC_AUTH_04: Exception Test bắt lỗi khi đăng ký tài khoản trùng lặp")
    public void testRegisterDuplicateUsernameThrowsException() {
        RegisterRequest req = new RegisterRequest("admin", "test@domain.com", "Password123@", "Password123@", "Trùng Admin");

        IllegalStateException ex = assertThrows(IllegalStateException.class, () -> {
            authService.register(req);
        });

        assertTrue(ex.getMessage().contains("đã được sử dụng"));
    }

    @Test
    @DisplayName("TC_PROD_01: Exception Test bắt lỗi khi thêm sản phẩm giá âm")
    public void testAddProductInvalidPriceThrowsException() {
        Product p = new Product();
        p.setName("Sản phẩm lỗi giá");
        p.setPrice(-50000);
        p.setStockCount(10);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> {
            productService.addProduct(p);
        });

        assertTrue(ex.getMessage().contains("lớn hơn 0"));
    }
}
