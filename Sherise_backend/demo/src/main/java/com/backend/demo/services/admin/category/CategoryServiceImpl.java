package com.backend.demo.services.admin.category;


import com.backend.demo.Entity.Category;
import com.backend.demo.Entity.Product;
import com.backend.demo.dto.CategoryDto;
import com.backend.demo.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public Category createcategory(CategoryDto categoryDto){
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());

        return categoryRepository.save(category);

    }
    public boolean deleteCategory(Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()){
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

}
