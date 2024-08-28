package com.backend.demo.services;

import com.backend.demo.Entity.ContactForm;
import com.backend.demo.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private static final Logger logger = LoggerFactory.getLogger(ContactService.class);

    private final ContactRepository contactRepository;
    private final EmailService emailService; // Inject EmailService

    public ContactForm postContactForm(ContactForm contactForm) {
        ContactForm savedContact = contactRepository.save(contactForm);
        try {
            // Send email notification after saving contact form
            String to = savedContact.getEmail();
            String subject = "Thank you for contacting us!";
            String text = "Dear " + savedContact.getName() + ",\n\nThank you for reaching out. We have received your message.";

            emailService.sendEmail(to, subject, text);

        } catch (Exception e) {
            logger.error("Error sending email", e);
        }

        return savedContact;
    }
}
