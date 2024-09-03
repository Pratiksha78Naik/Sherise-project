package com.backend.demo.repository;

import com.backend.demo.Entity.ParentQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentQueryRepository extends JpaRepository<ParentQuery, Long> {
}
