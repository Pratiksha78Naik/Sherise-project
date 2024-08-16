package com.backend.demo.controller;

import com.backend.demo.Entity.Registration;
import com.backend.demo.services.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/regi")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("/registration")
    public Registration postregistration(@RequestBody Registration registration){
        return registrationService.postregistration(registration);
}
}