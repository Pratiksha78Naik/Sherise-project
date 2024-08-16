package com.backend.demo.repository;

import com.backend.demo.Entity.Appointmentuser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointmentuser,Long>{





        }