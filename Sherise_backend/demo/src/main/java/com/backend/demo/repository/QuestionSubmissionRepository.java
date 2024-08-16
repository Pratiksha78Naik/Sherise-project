package com.backend.demo.repository;


import com.backend.demo.Entity.QuestionSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionSubmissionRepository extends JpaRepository<QuestionSubmission,Long>{
        }