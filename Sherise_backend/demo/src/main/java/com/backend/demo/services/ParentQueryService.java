package com.backend.demo.services;

import com.backend.demo.Entity.ParentQuery;
import com.backend.demo.repository.ParentQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParentQueryService {

    private final ParentQueryRepository parentQueryRepository;

    public ParentQuery saveParentQuery(ParentQuery parentQuery) {
        return parentQueryRepository.save(parentQuery);
    }

    public List<ParentQuery> getAllParentQueries() {
        return parentQueryRepository.findAll();
    }

    public ParentQuery getParentQueryById(Long id) {
        return parentQueryRepository.findById(id).orElse(null);
    }

    public void deleteParentQuery(Long id) {
        parentQueryRepository.deleteById(id);
    }
}
