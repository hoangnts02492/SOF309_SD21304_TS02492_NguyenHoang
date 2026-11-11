package com.poly.sof309.controllers;

import com.poly.sof309.models.Order;
import com.poly.sof309.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable String id) {
        Order order = orderService.getOrderById(id);
        if (order == null) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "Không tìm thấy đơn hàng");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
        }
        return ResponseEntity.ok(order);
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order orderData) {
        if (orderData.getCustomer() == null ||
                orderData.getCustomer().getName() == null || orderData.getCustomer().getName().trim().isEmpty() ||
                orderData.getCustomer().getPhone() == null || orderData.getCustomer().getPhone().trim().isEmpty() ||
                orderData.getCustomer().getAddress() == null || orderData.getCustomer().getAddress().trim().isEmpty() ||
                orderData.getItems() == null || orderData.getItems().isEmpty()) {

            Map<String, String> err = new HashMap<>();
            err.put("error", "Vui lòng điền đầy đủ thông tin giao hàng và giỏ hàng");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
        }

        Order newOrder = orderService.addOrder(orderData);

        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("message", "Đặt hàng thành công!");
        res.put("order", newOrder);

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}

