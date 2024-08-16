package com.backend.demo.services.auth;


import com.backend.demo.dto.SignupRequest;
import com.backend.demo.dto.UserDto;

public interface AuthService {

    UserDto createUser(SignupRequest signupRequest);
    Boolean hasUserWithEmail(String email);
}
