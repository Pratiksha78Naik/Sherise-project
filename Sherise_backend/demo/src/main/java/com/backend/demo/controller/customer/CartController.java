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
            System.err.println("Error adding product to cart: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the product to the cart.");
        }
    }



    @GetMapping("/cart/{userId}")
    public ResponseEntity<?> addProductToCart(@PathVariable Long userId){
        OrderDto orderDto = cartService.getCartByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(orderDto);

    }

    @GetMapping("/coupon/{userId}/{code}")
    public ResponseEntity<?> applyCoupon(@PathVariable Long userId, @PathVariable String code){
        try {
            OrderDto orderDto = cartService.applyCoupon(userId, code);
            return ResponseEntity.ok(orderDto);

        }catch (ValidationException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
    @PostMapping("/addition")
    public ResponseEntity<OrderDto> increaseProductQuantity(@RequestBody AddProductInCartDto addProductInCartDto){
        System.out.println("Received payload for addition: " + addProductInCartDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.increaseProductQuantity(addProductInCartDto));
    }

    @PostMapping("/deduction")
    public ResponseEntity<OrderDto> decreaseProductQuantity(@RequestBody AddProductInCartDto addProductInCartDto){
        System.out.println("Received payload for deduction: " + addProductInCartDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.decreaseProductQuantity(addProductInCartDto));
    }

    @PostMapping("/delete")
    public ResponseEntity<OrderDto> deleteProductFromCart(@RequestBody AddProductInCartDto addProductInCartDto) {
        System.out.println("Received payload for delete: " + addProductInCartDto);

        OrderDto updatedOrder = cartService.deleteProductFromCart(addProductInCartDto);

        if (updatedOrder != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedOrder); // Use OK (200) status for successful deletion
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 if the product or cart item is not found
        }
    }



    @PostMapping("/placeOrder")
    public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderDto placeOrderDto) {
        try {
            // Validate the input DTO
            if (placeOrderDto.getUserId() == null) {
                return ResponseEntity.badRequest().body("User ID is required.");
            }

            // Delegate the placement to the service
            ResponseEntity<?> response = cartService.placeOrder(placeOrderDto);

            // Forward the response from the service method
            return response;
        } catch (Exception e) {
            // Log the exception using a logger
            Logger logger = LoggerFactory.getLogger(this.getClass());
            logger.error("Error placing order", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while placing the order.");
        }
    }

    @GetMapping("/myOrders/{userId}")
    public ResponseEntity<List<OrderDto>> getMyPlacedOrders(@PathVariable Long userId) {
        // Calls the service to get the user's placed orders and returns them with an HTTP 200 OK status
        return ResponseEntity.ok(cartService.getMyPlacedOrders(userId));
    }


}
