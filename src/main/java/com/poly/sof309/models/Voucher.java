package com.poly.sof309.models;

public class Voucher {
    private String code;
    private int discountPercent;
    private long discountAmount;
    private boolean freeShipping;
    private String description;

    public Voucher() {
    }

    public Voucher(String code, int discountPercent, long discountAmount, boolean freeShipping, String description) {
        this.code = code;
        this.discountPercent = discountPercent;
        this.discountAmount = discountAmount;
        this.freeShipping = freeShipping;
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(int discountPercent) {
        this.discountPercent = discountPercent;
    }

    public long getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(long discountAmount) {
        this.discountAmount = discountAmount;
    }

    public boolean isFreeShipping() {
        return freeShipping;
    }

    public void setFreeShipping(boolean freeShipping) {
        this.freeShipping = freeShipping;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

