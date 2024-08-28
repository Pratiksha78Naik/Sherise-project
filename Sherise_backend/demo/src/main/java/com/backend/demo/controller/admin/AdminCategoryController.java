package com.backend.demo.controller.admin;

import com.backend.demo.Entity.Category;
import com.backend.demo.dto.CategoryDto;
import com.backend.demo.services.admin.category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminCategoryController {


    private final CategoryService categoryService;

    @PostMapping("/category")
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDto categoryDto){
        Category category = categoryService.createcategory(categoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(category);
    }

    @GetMapping("categories")
    public ResponseEntity<List<Category>>getAllCategories(){
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
}
