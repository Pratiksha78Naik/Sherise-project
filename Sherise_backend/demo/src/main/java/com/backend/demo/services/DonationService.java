package com.backend.demo.services;

import com.backend.demo.Entity.Donation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DonationService {

    private static final Logger logger = LoggerFactory.getLogger(DonationService.class);

    private final EmailService emailService;

    public Donation postDonation(Donation donation) {
        try {
            // Prepare email content
            String to = donation.getEmail();
            String subject = "Thank You for Your Donation!";
            String text = String.format(
                    "Dear %s,\n\n" +
                            "Thank you for your generous donation of ₹%.2f. Your support helps us continue our mission.\n\n" +
                            "Here are the details of your donation:\n" +
                            "Name: %s\n" +
                            "Email: %s\n" +
                            "Phone: %s\n" +
                            "Amount: ₹%.2f\n\n" +
                            "If you have any questions, please do not hesitate to contact us.\n\n" +
                            "Best Regards,\n" +
                            "Your Company Name",
                    donation.getName(),
                    donation.getAmount(),
                    donation.getName(),
                    donation.getEmail(),
                    donation.getPhone(),
                    donation.getAmount()
            );

            // Send plain text email notification
            emailService.sendEmail(to, subject, text, false);

        } catch (Exception e) {
            logger.error("Error processing donation and sending email", e);
        }

        return donation;
    }
}
