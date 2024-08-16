package com.backend.demo.controller;


import com.backend.demo.Entity.ContactForm;
import com.backend.demo.services.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/ContactForm")
    public ResponseEntity<ContactForm> postContactForm(@RequestBody ContactForm contactForm){
        try {
            ContactForm savedContact = contactService.postContactForm(contactForm);
            return new ResponseEntity<>(savedContact, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);


}


}
}
