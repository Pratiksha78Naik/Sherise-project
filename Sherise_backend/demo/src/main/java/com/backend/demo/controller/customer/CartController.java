package com.backend.demo.controller.customer;

import com.backend.demo.dto.AddProductInCartDto;
import com.backend.demo.dto.OrderDto;
import com.backend.demo.dto.PlaceOrderDto;
import com.backend.demo.exceptions.ValidationException;
import com.backend.demo.services.customer.cart.CartService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private static final Logger logger = LoggerFactory.getLogger(CartController.class); // Initialize logger

    @PostMapping("/cart")
    public ResponseEntity<?> addProductToCart(@RequestBody AddProductInCartDto addProductInCartDto) {
        try {
            // Validate the input DTO (if needed)
            if (addProductInCartDto.getUserId() == null || addProductInCartDto.getProductId() == null) {
                return ResponseEntity.badRequest().body("User ID and Product ID are required.");
            }

            // Delegate the addition to the service
            ResponseEntity<?> response = cartService.addProductToCart(addProductInCartDto);

            // Forward the response from the service method
            return response;
        } catch (Exception e) {
            // Log the exception
            logger.error("Error adding product to cart", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the product to the cart.");
        }
    }

    @GetMapping("/cart/{userId}")
    public ResponseEntity<?> getCartByUserId(@PathVariable Long userId){
        OrderDto orderDto = cartService.getCartByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(orderDto);
    }

    @GetMapping("/coupon/{userId}/{code}")
    public ResponseEntity<?> applyCoupon(@PathVariable Long userId, @PathVariable String code){
        try {
            OrderDto orderDto = cartService.applyCoupon(userId, code);
            return ResponseEntity.ok(orderDto);
        } catch (ValidationException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PostMapping("/addition")
    public ResponseEntity<OrderDto> increaseProductQuantity(@RequestBody AddProductInCartDto addProductInCartDto){
        logger.info("Received payload for addition: {}", addProductInCartDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.increaseProductQuantity(addProductInCartDto));
    }

    @PostMapping("/deduction")
    public ResponseEntity<OrderDto> decreaseProductQuantity(@RequestBody AddProductInCartDto addProductInCartDto){
        logger.info("Received payload for deduction: {}", addProductInCartDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.decreaseProductQuantity(addProductInCartDto));
    }

    @PostMapping("/delete")
    public ResponseEntity<OrderDto> deleteProductFromCart(@RequestBody AddProductInCartDto addProductInCartDto) {
        logger.info("Received payload for delete: {}", addProductInCartDto);

        OrderDto updatedOrder = cartService.deleteProductFromCart(addProductInCartDto);

        if (updatedOrder != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedOrder);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/placeOrder")
    public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderDto placeOrderDto) {
        try {
            // Validate the input DTO
            if (placeOrderDto.getUserId() == null) {
                return ResponseEntity.badRequest().body(new ErrorResponse("User ID is required."));
            }

            // Delegate the placement to the service
            return cartService.placeOrder(placeOrderDto);
        } catch (Exception e) {
            // Log the exception using the logger
            logger.error("Error placing order", e);

            // Return a generic error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("An error occurred while placing the order."));
        }
    }

    @GetMapping("/myOrders/{userId}")
    public ResponseEntity<List<OrderDto>> getMyPlacedOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getMyPlacedOrders(userId));
    }

    // Define ErrorResponse class
    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
