package com.backend.demo.dto;


import com.backend.demo.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private Long id;

    private String name;

    private String email;

    private String password;

    private UserRole role;
}
