package com.backend.demo.services;

import com.backend.demo.Entity.Registration;
import com.backend.demo.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationService {
    private final RegistrationRepository registrationRepository;

    public Registration postregistration(Registration registration){
        return registrationRepository.save(registration);
}
}