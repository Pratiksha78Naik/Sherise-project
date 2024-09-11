package com.backend.demo.controller;

import com.backend.demo.Entity.Donation;
import com.backend.demo.services.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/donation")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DonationController {

    private final DonationService donationService;

    @PostMapping("/donate")
    public ResponseEntity<Donation> postDonation(@RequestBody Donation donation) {
        try {
            Donation savedDonation = donationService.postDonation(donation);
            return new ResponseEntity<>(savedDonation, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
