package com.backend.demo.controller;

import com.backend.demo.Entity.HealthCampRegistration;
import com.backend.demo.services.HealthCampRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/form")
@RequiredArgsConstructor
@CrossOrigin("*")
public class HealthCampRegistrationController {

    private final HealthCampRegistrationService registrationService;

    @PostMapping("/form1")
    public ResponseEntity<HealthCampRegistration> postContactForm(@RequestBody HealthCampRegistration healthCampRegistration){
        try {
            HealthCampRegistration savedContact = registrationService.postHealthCampRegistration(healthCampRegistration);
            return new ResponseEntity<>(savedContact, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
 }
}
}