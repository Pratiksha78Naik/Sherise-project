package com.backend.demo.services.customer.cart;

import com.backend.demo.dto.AddProductInCartDto;
import com.backend.demo.dto.OrderDto;
import org.springframework.http.ResponseEntity;

public interface CartService {

    ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto);

    OrderDto getCartByUserId(Long userId);

}
