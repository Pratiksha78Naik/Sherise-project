package com.backend.demo.Entity;

import lombok.Data;

@Data
public class Donation {
    private String name;
    private String email;
    private String phone;
    private double amount;
}
