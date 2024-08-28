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
            // Prepare email content
            String to = savedContact.getEmail();
            String subject = "Thank You for Contacting Us!";
            String text = String.format(
                    "Dear %s,\n\n" +
                            "Thank you for reaching out to us. We have received your message and will get back to you shortly.\n\n" +
                            "Here are the details of your submission:\n" +
                            "Name: %s\n" +
                            "Email: %s\n" +
                            "Message: %s\n\n" +
                            "If you have any further questions or need assistance, please do not hesitate to contact us.\n\n" +
                            "Best Regards,\n" +
                            "Your Company Name",
                    savedContact.getName(),
                    savedContact.getName(),
                    savedContact.getEmail(),
                    contactForm.getMessage() // Adjust this to the field name that stores the contact message
            );

            // Send plain text email notification
            emailService.sendEmail(to, subject, text, false);

        } catch (Exception e) {
            logger.error("Error processing contact form and sending email", e);
        }

        return savedContact;
    }
}
