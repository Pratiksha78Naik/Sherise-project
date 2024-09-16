package com.backend.demo.controller;

import com.backend.demo.Entity.ParentQuery;
import com.backend.demo.services.ParentQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parent-queries")
@CrossOrigin(origins = "*")
public class ParentQueryController {

    private final ParentQueryService parentQueryService;

    @Autowired
    public ParentQueryController(ParentQueryService parentQueryService) {
        this.parentQueryService = parentQueryService;
    }

    @PostMapping
    public ResponseEntity<ParentQuery> createParentQuery(@RequestBody ParentQuery parentQuery) {
        ParentQuery savedQuery = parentQueryService.saveParentQuery(parentQuery);
        return new ResponseEntity<>(savedQuery, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ParentQuery>> getAllParentQueries() {
        List<ParentQuery> queries = parentQueryService.getAllParentQueries();
        return new ResponseEntity<>(queries, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParentQuery> getParentQueryById(@PathVariable Long id) {
        ParentQuery query = parentQueryService.getParentQueryById(id);
        return new ResponseEntity<>(query, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParentQuery(@PathVariable Long id) {
        parentQueryService.deleteParentQuery(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
