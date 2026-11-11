package com.poly.sof309.models;

public class VoucherVerifyRequest {
    private String code;

    public VoucherVerifyRequest() {
    }

    public VoucherVerifyRequest(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}

