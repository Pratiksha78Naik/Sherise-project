package com.backend.demo.controller;

import com.backend.demo.Entity.BoysQuery;
import com.backend.demo.services.BoysQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boys-queries")
@CrossOrigin(origins = "*")
public class BoysQueryController {

    private final BoysQueryService boysQueryService;

    @Autowired
    public BoysQueryController(BoysQueryService boysQueryService) {
        this.boysQueryService = boysQueryService;
    }

    @PostMapping
    public ResponseEntity<BoysQuery> createBoysQuery(@RequestBody BoysQuery boysQuery) {
        BoysQuery savedQuery = boysQueryService.saveBoysQuery(boysQuery);
        return new ResponseEntity<>(savedQuery, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BoysQuery>> getAllBoysQueries() {
        List<BoysQuery> queries = boysQueryService.getAllBoysQueries();
        return new ResponseEntity<>(queries, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoysQuery> getBoysQueryById(@PathVariable Long id) {
        BoysQuery query = boysQueryService.getBoysQueryById(id);
        return query != null ? new ResponseEntity<>(query, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoysQuery(@PathVariable Long id) {
        boysQueryService.deleteBoysQuery(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
