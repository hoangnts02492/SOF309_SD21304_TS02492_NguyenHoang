package com.poly.sof309.services;

import com.poly.sof309.models.RegisterRequest;
import com.poly.sof309.models.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    private final List<User> users = Collections.synchronizedList(new ArrayList<>());

    public AuthService() {
        initDefaultUsers();
    }

    private void initDefaultUsers() {
        users.add(new User("usr-01", "admin", "admin@conbovuive.vn", "123", "Quản Trị Viên", "ADMIN"));
        users.add(new User("usr-02", "hoangnguyen", "hoang.ts02492@poly.edu.vn", "12345678@A", "Nguyễn Hoàng", "USER"));
        users.add(new User("usr-03", "customer", "customer@gmail.com", "Password@123", "Khách Hàng Mẫu", "USER"));
    }

    public boolean authenticate(String username, String password) {
        if (username == null || password == null || username.trim().isEmpty() || password.trim().isEmpty()) {
            return false;
        }
        return users.stream()
                .anyMatch(u -> u.getUsername().equalsIgnoreCase(username.trim()) && u.getPassword().equals(password.trim()));
    }

    public Optional<User> findByUsername(String username) {
        if (username == null) return Optional.empty();
        return users.stream()
                .filter(u -> u.getUsername().equalsIgnoreCase(username.trim()))
                .findFirst();
    }

    public User register(RegisterRequest req) {
        if (req == null) {
            throw new IllegalArgumentException("Dữ liệu đăng ký không được để trống");
        }
        if (req.getUsername() == null || req.getUsername().trim().length() < 3 || req.getUsername().trim().length() > 20) {
            throw new IllegalArgumentException("Tên đăng nhập phải từ 3 đến 20 ký tự");
        }
        if (req.getEmail() == null || !req.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Email không đúng định dạng hợp lệ");
        }
        if (req.getPassword() == null || req.getPassword().length() < 3) {
            throw new IllegalArgumentException("Mật khẩu không được để trống hoặc quá ngắn");
        }
        if (req.getConfirmPassword() != null && !req.getPassword().equals(req.getConfirmPassword())) {
            throw new IllegalArgumentException("Xác nhận mật khẩu không trùng khớp");
        }
        if (findByUsername(req.getUsername()).isPresent()) {
            throw new IllegalStateException("Tên tài khoản '" + req.getUsername() + "' đã được sử dụng");
        }

        User newUser = new User(
                "usr-" + (users.size() + 1),
                req.getUsername().trim(),
                req.getEmail().trim(),
                req.getPassword(),
                req.getFullName() != null ? req.getFullName().trim() : req.getUsername().trim(),
                "USER"
        );
        users.add(newUser);
        return newUser;
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(users);
    }
}

