package com.poly.sof309.models;

import java.util.List;

public class Order {
    private String id;
    private String createdAt;
    private Customer customer;
    private List<OrderItem> items;
    private String voucherCode;
    private long discount;
    private long shippingFee;
    private long total;
    private String note;
    private String status;

    public Order() {
    }

    public Order(String id, String createdAt, Customer customer, List<OrderItem> items,
                 String voucherCode, long discount, long shippingFee, long total,
                 String note, String status) {
        this.id = id;
        this.createdAt = createdAt;
        this.customer = customer;
        this.items = items;
        this.voucherCode = voucherCode;
        this.discount = discount;
        this.shippingFee = shippingFee;
        this.total = total;
        this.note = note;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public String getVoucherCode() {
        return voucherCode;
    }

    public void setVoucherCode(String voucherCode) {
        this.voucherCode = voucherCode;
    }

    public long getDiscount() {
        return discount;
    }

    public void setDiscount(long discount) {
        this.discount = discount;
    }

    public long getShippingFee() {
        return shippingFee;
    }

    public void setShippingFee(long shippingFee) {
        this.shippingFee = shippingFee;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

