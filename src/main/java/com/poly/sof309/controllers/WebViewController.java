package com.poly.sof309.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebViewController {

    @GetMapping("/login")
    public String loginPage() {
        return "forward:/login.html";
    }

    @GetMapping(value = {"/", "/home", "/products", "/cart", "/checkout", "/register"})
    public String forwardSpa() {
        return "forward:/index.html";
    }
}

