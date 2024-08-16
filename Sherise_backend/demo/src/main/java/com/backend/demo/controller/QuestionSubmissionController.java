package com.backend.demo.controller;

import com.backend.demo.Entity.QuestionSubmission;
import com.backend.demo.services.QuestionSubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionSubmissionController {

    private final QuestionSubmissionService questionService;

    @PostMapping("/submit")
    public QuestionSubmission submitQuestion(@RequestBody QuestionSubmission questionSubmission) {
        return questionService.submitQuestion(questionSubmission);
}
}