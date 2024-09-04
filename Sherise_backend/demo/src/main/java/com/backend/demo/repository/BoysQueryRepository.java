package com.backend.demo.repository;

import com.backend.demo.Entity.BoysQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoysQueryRepository extends JpaRepository<BoysQuery, Long> {
}
