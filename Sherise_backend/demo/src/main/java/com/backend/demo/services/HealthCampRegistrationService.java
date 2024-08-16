package com.backend.demo.services;

import com.backend.demo.Entity.HealthCampRegistration;
import com.backend.demo.repository.HealthCampRegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HealthCampRegistrationService {

    private final HealthCampRegistrationRepository healthCampRegistrationRepository;

    public HealthCampRegistration postHealthCampRegistration(HealthCampRegistration healthCampRegistration) {
        return healthCampRegistrationRepository.save(healthCampRegistration);
}
}