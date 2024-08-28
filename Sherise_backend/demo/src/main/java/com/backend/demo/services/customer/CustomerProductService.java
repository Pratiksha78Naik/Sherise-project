package com.backend.demo.services.customer;

import com.backend.demo.dto.ProductDto;

import java.util.List;

public interface CustomerProductService {

    List<ProductDto> searchProductByTitle(String title);
    List<ProductDto> getAllProducts();
}
