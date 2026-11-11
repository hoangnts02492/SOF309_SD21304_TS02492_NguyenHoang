package com.poly.sof309.models;

public class VoucherVerifyResponse {
    private boolean valid;
    private String code;
    private int discountPercent;
    private long discountAmount;
    private boolean freeShipping;
    private String description;
    private String message;

    public VoucherVerifyResponse() {
    }

    public static VoucherVerifyResponse success(String code, int discountPercent, long discountAmount, boolean freeShipping, String description) {
        VoucherVerifyResponse res = new VoucherVerifyResponse();
        res.valid = true;
        res.code = code;
        res.discountPercent = discountPercent;
        res.discountAmount = discountAmount;
        res.freeShipping = freeShipping;
        res.description = description;
        return res;
    }

    public static VoucherVerifyResponse fail(String message) {
        VoucherVerifyResponse res = new VoucherVerifyResponse();
        res.valid = false;
        res.message = message;
        return res;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

