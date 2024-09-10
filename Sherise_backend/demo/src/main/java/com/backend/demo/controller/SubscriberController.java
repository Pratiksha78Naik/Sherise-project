package com.backend.demo.controller;

import com.backend.demo.Entity.Subscriber;
import com.backend.demo.services.SubscriberService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subscribe")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SubscriberController {

    private final SubscriberService subscriberService;

    @PostMapping("/subscribeUser")
    public ResponseEntity<Subscriber> subscribeUser(@RequestBody Subscriber subscriber) {
        try {
            Subscriber savedSubscriber = subscriberService.subscribeUser(subscriber);
            return new ResponseEntity<>(savedSubscriber, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}