package com.backend.demo.services.customer.cart;


import com.backend.demo.Entity.CartItems;
import com.backend.demo.Entity.Order;
import com.backend.demo.Entity.Product;
import com.backend.demo.Entity.User;
import com.backend.demo.dto.AddProductInCartDto;
import com.backend.demo.dto.CartItemsDto;
import com.backend.demo.dto.OrderDto;
import com.backend.demo.enums.OrderStatus;
import com.backend.demo.repository.CartItemsRepository;
import com.backend.demo.repository.OrderRepository;
import com.backend.demo.repository.ProductRepository;
import com.backend.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private OrderRepository orderRepository;


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @Autowired
    private ProductRepository productRepository;


    public ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto) {
        // Find the active order for the user
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.Pending);

        if (activeOrder == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Active order not found for the user");
        }

        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());
        Optional<User> optionalUser = userRepository.findById(addProductInCartDto.getUserId());

        if (optionalProduct.isPresent() && optionalUser.isPresent()) {
            Product product = optionalProduct.get();

            // Check if the product is already in the cart
            Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                    addProductInCartDto.getProductId(), activeOrder.getId(), addProductInCartDto.getUserId());

            CartItems cartItem;
            if (optionalCartItems.isPresent()) {
                // Product is already in the cart, update the quantity and price
                cartItem = optionalCartItems.get();
                cartItem.setQuantity(cartItem.getQuantity() + 1);
                cartItem.setPrice(cartItem.getPrice() + product.getPrice());
            } else {
                // Product is not in the cart, add it as a new item
                cartItem = new CartItems();
                cartItem.setProduct(product);
                cartItem.setPrice(product.getPrice());
                cartItem.setQuantity(1L);
                cartItem.setUser(optionalUser.get());
                cartItem.setOrder(activeOrder);
            }

            // Save the cart item and update the order
            cartItemsRepository.save(cartItem);

            activeOrder.setTotalAmount(activeOrder.getTotalAmount() + product.getPrice());
            activeOrder.setAmount(activeOrder.getAmount() + product.getPrice());
            activeOrder.getCartItems().add(cartItem);
            orderRepository.save(activeOrder);

            return ResponseEntity.status(HttpStatus.CREATED).body(cartItem);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or product not found");
        }
    }


    public OrderDto getCartByUserId(Long userId){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.Pending);
        List<CartItemsDto> cartItemsDtoList = activeOrder.getCartItems().stream().map(CartItems::getCartDto).collect(Collectors.toList());
        OrderDto orderDto = new OrderDto();
        orderDto.setAmount(activeOrder.getAmount());
        orderDto.setId(activeOrder.getId());
        orderDto.setOrderStatus(activeOrder.getOrderStatus());
        orderDto.setDiscount(activeOrder.getDiscount());
        orderDto.setTotalAmount(activeOrder.getTotalAmount());
        orderDto.setCartItems(cartItemsDtoList);

        return orderDto;

    }
}
