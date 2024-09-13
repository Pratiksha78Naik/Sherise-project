package com.backend.demo.controller;

import com.backend.demo.Entity.User;
import com.backend.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();  // Return NO_CONTENT status for empty list
        }
        return ResponseEntity.ok(users);  // Return OK status with user list
    }

    // Get a user by ID
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create a new user
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        // Ensure password is encoded
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);  // Return CREATED status with saved user
    }

    // Update a user
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody User updatedUser) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setRole(updatedUser.getRole());

            // Only update the password if it's provided
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }

            user.setImg(updatedUser.getImg());
            userRepository.save(user);
            return ResponseEntity.ok(user);  // Return OK status with updated user
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Return NOT_FOUND status
        }
    }

    // Delete a user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok().build();  // Return OK status without content
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Return NOT_FOUND status
        }
    }
}
