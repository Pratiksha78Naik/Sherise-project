package com.backend.demo.services.customer.cart;

import com.backend.demo.Entity.Order;
import com.backend.demo.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class PlaceOrderMailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderConfirmationEmail(Order order) {
        User user = order.getUser();
        String toEmail = user.getEmail();
        String subject = "Order Confirmation - " + order.getTrackingId();
        String body = generateEmailBody(order);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        // Send the email
        mailSender.send(message);
    }

    private String generateEmailBody(Order order) {
        return "Dear " + order.getUser().getName() + ",\n\n" +
                "Thank you for placing your order with us! Your order details are as follows:\n\n" +
                "Order Tracking ID: " + order.getTrackingId() + "\n" +
                "Total Amount: ₹" + order.getAmount() + "\n" +
                "Order Status: " + order.getOrderStatus() + "\n\n" +
                "We will notify you when your order is shipped.\n\n" +
                "Best regards,\n" +
                "The Sherise Team";
    }
}
