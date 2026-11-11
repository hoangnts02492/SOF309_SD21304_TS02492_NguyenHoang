package com.poly.sof309.services;

import com.poly.sof309.models.Voucher;
import com.poly.sof309.models.VoucherVerifyResponse;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class VoucherService {
    private final Map<String, Voucher> vouchers = new HashMap<>();

    public VoucherService() {
        initVouchers();
    }

    private void initVouchers() {
        vouchers.put("GEARVIP10", new Voucher("GEARVIP10", 10, 0, false, "Giảm 10% tổng đơn hàng"));
        vouchers.put("FREESHIP", new Voucher("FREESHIP", 0, 0, true, "Miễn phí vận chuyển toàn quốc"));
        vouchers.put("CHAOBAN", new Voucher("CHAOBAN", 0, 100000, false, "Giảm ngay 100.000₫ cho khách hàng mới"));
        vouchers.put("CONBOVUIVE", new Voucher("CONBOVUIVE", 15, 0, false, "Đặc quyền thành viên Conbovuive - Giảm 15%"));
    }

    public VoucherVerifyResponse verifyVoucher(String code) {
        if (code == null || code.trim().isEmpty()) {
            return VoucherVerifyResponse.fail("Vui lòng nhập mã giảm giá");
        }
        String cleanCode = code.toUpperCase().trim();
        Voucher voucher = vouchers.get(cleanCode);
        if (voucher != null) {
            return VoucherVerifyResponse.success(
                    voucher.getCode(),
                    voucher.getDiscountPercent(),
                    voucher.getDiscountAmount(),
                    voucher.isFreeShipping(),
                    voucher.getDescription()
            );
        }
        return VoucherVerifyResponse.fail("Mã giảm giá không hợp lệ hoặc đã hết hạn!");
    }
}

