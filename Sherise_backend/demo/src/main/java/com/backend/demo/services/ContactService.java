package com.backend.demo.services;

import com.backend.demo.Entity.ContactForm;
import com.backend.demo.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactForm postContactForm(ContactForm contactForm){
        return contactRepository.save(contactForm);
    }
}
