package com.backend.demo.repository;

import com.backend.demo.Entity.HealthCampRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthCampRegistrationRepository extends JpaRepository<HealthCampRegistration,Long>{
        }