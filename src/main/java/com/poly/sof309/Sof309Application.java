package com.poly.sof309;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Sof309Application {

    public static void main(String[] args) {
        SpringApplication.run(Sof309Application.class, args);
        System.out.println("====================================================");
        System.out.println("  CONBOVUIVE GEAR - SPRING BOOT SERVER STARTED     ");
        System.out.println("  Website:  http://localhost:8080                   ");
        System.out.println("  API Docs: http://localhost:8080/api/products     ");
        System.out.println("====================================================");
    }
}

