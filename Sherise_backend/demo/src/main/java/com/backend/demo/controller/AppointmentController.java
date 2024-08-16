package com.backend.demo.controller;

import com.backend.demo.Entity.Appointmentuser;
import com.backend.demo.services.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appoint")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AppointmentController {


    private final AppointmentService appointmentService;

    @PostMapping("/appointmentuser")
    public ResponseEntity<Appointmentuser> postAppointment(@RequestBody Appointmentuser appointmentuser) {
        try {
            Appointmentuser savedAppointment = appointmentService.postAppointment(appointmentuser);
            return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
 }
}
}