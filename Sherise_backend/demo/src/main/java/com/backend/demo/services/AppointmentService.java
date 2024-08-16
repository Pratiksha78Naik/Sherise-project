package com.backend.demo.services;

import com.backend.demo.Entity.Appointmentuser;
import com.backend.demo.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    @Autowired
    private final AppointmentRepository appointmentRepository;

    public Appointmentuser postAppointment(Appointmentuser appointmentuser) {
        return appointmentRepository.save(appointmentuser);
    }


    public List<Appointmentuser> getAllAppointments() {
        return appointmentRepository.findAll();
}
}