package com.backend.demo.repository;

import com.backend.demo.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByNameContaining(String title);
    List<Product> findByCategoryId(Long categoryId);
}
