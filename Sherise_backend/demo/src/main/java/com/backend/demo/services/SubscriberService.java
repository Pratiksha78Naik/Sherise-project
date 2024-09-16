package com.backend.demo.services;

import com.backend.demo.Entity.Subscriber;
import com.backend.demo.repository.SubscriberRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@EnableAsync
public class SubscriberService {

    private static final Logger logger = LoggerFactory.getLogger(SubscriberService.class);

    private final SubscriberRepository subscriberRepository;
    private final SubServices emailService;

    public Subscriber subscribeUser(Subscriber subscriber) {
        Subscriber savedSubscriber = subscriberRepository.save(subscriber);
        try {
            String to = savedSubscriber.getEmail();
            String subject = "Subscription Successful!";
            String text = "Dear Subscriber,\n\nThank you for subscribing to SheRise updates. " +
                    "You will now receive the latest news and information.\n\n" +
                    "Best Regards,\nSheRise";

            emailService.sendEmail(to, subject, text, false);

        } catch (Exception e) {
            logger.error("Error processing subscription and sending email", e);
        }

        return savedSubscriber;
    }
}