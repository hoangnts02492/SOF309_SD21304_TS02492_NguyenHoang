package com.poly.sof309.controllers;

import com.poly.sof309.services.CategoryService;
import com.poly.sof309.services.OrderService;
import com.poly.sof309.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class StatsController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final OrderService orderService;

    @Autowired
    public StatsController(ProductService productService, CategoryService categoryService, OrderService orderService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProducts", productService.getTotalCount());
        stats.put("totalCategories", categoryService.getAllCategories().size());
        stats.put("totalOrders", orderService.getAllOrders().size());
        stats.put("hotCount", productService.getHotCount());
        return ResponseEntity.ok(stats);
    }
}

