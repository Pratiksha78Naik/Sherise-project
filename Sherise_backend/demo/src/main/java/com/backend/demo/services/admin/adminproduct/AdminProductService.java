package com.backend.demo.services.admin.adminproduct;

import com.backend.demo.dto.ProductDto;

import java.io.IOException;
import java.util.List;

public interface AdminProductService {

    ProductDto addProduct(ProductDto productDto) throws IOException;

    List<ProductDto> getAllProducts();

    List<ProductDto> getAllProductByName(String name);

    List<ProductDto> getAllProductsByCategory(Long categoryId);

    boolean deleteProduct(Long id);
}
