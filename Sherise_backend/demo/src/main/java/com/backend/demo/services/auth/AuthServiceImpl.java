package com.backend.demo.services.auth;

import com.backend.demo.Entity.User;
import com.backend.demo.dto.SignupRequest;
import com.backend.demo.dto.UserDto;
import com.backend.demo.enums.UserRole;
import com.backend.demo.repository.UserRepository;
// Import SignupEmailService
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@EnableAsync
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SignupEmailService signupEmailService;  // Use SignupEmailService

    @Override
    public UserDto createUser(SignupRequest signupRequest) {
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword())); // Use injected PasswordEncoder
        user.setRole(UserRole.CUSTOMER);

        User createdUser = userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());

        sendThankYouEmail(signupRequest.getEmail());  // Send email after user creation

        return userDto;
    }

    @Override
    public Boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @PostConstruct
    public void createAdminAccount() {
        User adminAccount = userRepository.findByRole(UserRole.ADMIN);

        if (adminAccount == null) {
            User user = new User();
            user.setEmail("admin@test.com");
            user.setName("admin");
            user.setRole(UserRole.ADMIN);
            user.setPassword(passwordEncoder.encode("admin"));
            userRepository.save(user);
        }
    }


    @Override
    public void sendThankYouEmail(String email) {
        String subject = "Thank you for registering!";
        String message = "Dear User,\n\nThank you for registering on our platform.\n\nBest regards,\nSheRise";
        signupEmailService.sendEmail(email, subject, message);  // Use SignupEmailService to send the email
    }
}