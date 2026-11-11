package com.poly.sof309.controllers;

import com.poly.sof309.models.ApiResponse;
import com.poly.sof309.models.LoginRequest;
import com.poly.sof309.models.RegisterRequest;
import com.poly.sof309.models.User;
import com.poly.sof309.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Phương thức xác thực người dùng - có thể gọi trực tiếp từ Unit Test
     */
    public boolean authenticate(String username, String password) {
        return authService.authenticate(username, password);
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> loginApi(@RequestBody LoginRequest request) {
        if (request == null || request.getUsername() == null || request.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Vui lòng nhập tài khoản và mật khẩu"));
        }

        boolean isValid = authService.authenticate(request.getUsername(), request.getPassword());
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Tài khoản hoặc mật khẩu không chính xác"));
        }

        Optional<User> userOpt = authService.findByUsername(request.getUsername());
        Map<String, Object> data = new HashMap<>();
        data.put("user", userOpt.orElse(null));
        data.put("token", "bearer-token-cbv-" + System.currentTimeMillis());

        return ResponseEntity.ok(ApiResponse.ok("Đăng nhập thành công", data));
    }

    @PostMapping("/api/auth/register")
    public ResponseEntity<?> registerApi(@RequestBody RegisterRequest request) {
        try {
            User created = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.ok("Đăng ký tài khoản thành công", created));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/api/auth/profile")
    public ResponseEntity<?> getProfile(@RequestParam String username) {
        Optional<User> userOpt = authService.findByUsername(username);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(ApiResponse.ok("Thành công", userOpt.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("Không tìm thấy người dùng"));
    }
}

