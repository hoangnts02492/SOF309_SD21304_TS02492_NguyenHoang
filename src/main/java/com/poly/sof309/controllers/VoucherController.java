package com.poly.sof309.controllers;

import com.poly.sof309.models.VoucherVerifyRequest;
import com.poly.sof309.models.VoucherVerifyResponse;
import com.poly.sof309.services.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/voucher")
@CrossOrigin(origins = "*")
public class VoucherController {

    private final VoucherService voucherService;

    @Autowired
    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }

    @PostMapping("/verify")
    public ResponseEntity<VoucherVerifyResponse> verifyVoucher(@RequestBody VoucherVerifyRequest request) {
        if (request == null || request.getCode() == null || request.getCode().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(VoucherVerifyResponse.fail("Vui lòng nhập mã giảm giá"));
        }

        VoucherVerifyResponse response = voucherService.verifyVoucher(request.getCode());
        if (response.isValid()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}

