package com.poly.sof309.services;

import com.poly.sof309.models.Order;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
public class OrderService {
    private final List<Order> orders = Collections.synchronizedList(new ArrayList<>());
    private final Random random = new Random();

    public List<Order> getAllOrders() {
        return new ArrayList<>(orders);
    }

    public Order getOrderById(String id) {
        synchronized (orders) {
            return orders.stream()
                    .filter(o -> o.getId().equalsIgnoreCase(id))
                    .findFirst()
                    .orElse(null);
        }
    }

    public Order addOrder(Order order) {
        if (order.getId() == null || order.getId().isEmpty()) {
            order.setId("CBV-" + (100000 + random.nextInt(900000)));
        }
        if (order.getCreatedAt() == null || order.getCreatedAt().isEmpty()) {
            order.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        }
        if (order.getStatus() == null || order.getStatus().isEmpty()) {
            order.setStatus("Chờ xác nhận");
        }
        orders.add(0, order);
        return order;
    }
}

