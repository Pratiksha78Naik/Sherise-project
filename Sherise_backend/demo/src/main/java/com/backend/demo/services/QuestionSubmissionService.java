package com.backend.demo.services;


import com.backend.demo.Entity.QuestionSubmission;
import com.backend.demo.repository.QuestionSubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionSubmissionService {

    private final QuestionSubmissionRepository questionRepository;

    public QuestionSubmission submitQuestion(QuestionSubmission questionSubmission) {
        return questionRepository.save(questionSubmission);
}
}