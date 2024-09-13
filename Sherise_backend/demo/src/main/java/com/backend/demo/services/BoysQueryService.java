package com.backend.demo.services;

import com.backend.demo.Entity.BoysQuery;
import com.backend.demo.repository.BoysQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoysQueryService {

    private final BoysQueryRepository boysQueryRepository;

    public BoysQuery saveBoysQuery(BoysQuery boysQuery) {
        return boysQueryRepository.save(boysQuery);
    }

    public List<BoysQuery> getAllBoysQueries() {
        return boysQueryRepository.findAll();
    }

    public BoysQuery getBoysQueryById(Long id) {
        return boysQueryRepository.findById(id).orElse(null);
    }

    public void deleteBoysQuery(Long id) {
        boysQueryRepository.deleteById(id);
    }
}
