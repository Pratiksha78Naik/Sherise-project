package com.backend.demo.services.admin.category;

import com.backend.demo.Entity.Category;
import com.backend.demo.dto.CategoryDto;

import java.util.List;

public interface CategoryService {

    Category createcategory(CategoryDto categoryDto);


    List<Category> getAllCategories();
    boolean deleteCategory(Long id);
}
