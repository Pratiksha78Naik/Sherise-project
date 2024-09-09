package com.backend.demo.services.customer.cart;


import com.backend.demo.Entity.*;
import com.backend.demo.dto.AddProductInCartDto;
import com.backend.demo.dto.CartItemsDto;
import com.backend.demo.dto.OrderDto;
import com.backend.demo.dto.PlaceOrderDto;
import com.backend.demo.enums.OrderStatus;
import com.backend.demo.exceptions.ValidationException;
import com.backend.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
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

    @Autowired
    private CouponRepository couponRepository;


    public ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto) {
        try {
            // Fetch or create the active order
            Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.Pending);

            if (activeOrder == null) {
                // Create a new order if none exists
                activeOrder = new Order();
                User user = userRepository.findById(addProductInCartDto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
                activeOrder.setUser(user);
                activeOrder.setOrderStatus(OrderStatus.Pending);
                activeOrder.setTotalAmount(0L);
                activeOrder.setAmount(0L);
                activeOrder = orderRepository.save(activeOrder); // Save the new order to the database
            }

            // Fetch the product and user
            Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());
            Optional<User> optionalUser = userRepository.findById(addProductInCartDto.getUserId());

            if (optionalProduct.isPresent() && optionalUser.isPresent()) {
                Product product = optionalProduct.get();
                User user = optionalUser.get();

                // Check if the product is already in the cart for this order
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
                    cartItem.setUser(user);
                    cartItem.setOrder(activeOrder);
                    activeOrder.getCartItems().add(cartItem);
                }

                // Save the cart item and update the order
                cartItemsRepository.save(cartItem);

                activeOrder.setTotalAmount(activeOrder.getTotalAmount() + product.getPrice());
                activeOrder.setAmount(activeOrder.getAmount() + product.getPrice());
                orderRepository.save(activeOrder);

                return ResponseEntity.status(HttpStatus.CREATED).body("Product added to cart successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or product not found.");
            }
        } catch (Exception e) {
            // Log the exception
            System.err.println("Error adding product to cart: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the product to the cart.");
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
        if (activeOrder.getCoupon() != null){
            orderDto.setCouponName(activeOrder.getCoupon().getName());
        }

        return orderDto;

    }

    public OrderDto applyCoupon(Long userId, String code){

        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.Pending);
        Coupon coupon =couponRepository.findByCode(code).orElseThrow(()-> new ValidationException("Coupon not found."));

        if (couponIsExpired(coupon)){
            throw new ValidationException("Coupon has expried");
        }

        double discountAmount = ((coupon.getDiscount()/ 100.0 * activeOrder.getTotalAmount()));

        double netAmount = activeOrder.getTotalAmount() - discountAmount;

        activeOrder.setAmount((long)netAmount);
        activeOrder.setDiscount((long)discountAmount);
        activeOrder.setCoupon(coupon);


        orderRepository.save(activeOrder);
        return activeOrder.getOrderDto();
    }

    private boolean couponIsExpired(Coupon coupon){
        Date currentdate = new Date();
        Date expirationDate = coupon.getExpirationDate();

        return expirationDate !=null && currentdate.after(expirationDate);
    }

    public OrderDto increaseProductQuantity(AddProductInCartDto addProductInCartDto){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.Pending);
        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());

        Optional<CartItems> optionalCartItem = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                addProductInCartDto.getProductId(), activeOrder.getId(), addProductInCartDto.getUserId()
        );

        if (optionalProduct.isPresent() && optionalCartItem.isPresent()){

            CartItems cartItem = optionalCartItem.get();
            Product product = optionalProduct.get();

            activeOrder.setAmount(activeOrder.getAmount() + product.getPrice());
            activeOrder.setTotalAmount(activeOrder.getTotalAmount() + product.getPrice());

            cartItem.setQuantity(cartItem.getQuantity() + 1);

            if (activeOrder.getCoupon() != null){

                double discountAmount = ((activeOrder.getCoupon().getDiscount()/ 100.0 * activeOrder.getTotalAmount()));

                double netAmount = activeOrder.getTotalAmount() - discountAmount;

                activeOrder.setAmount((long)netAmount);
                activeOrder.setDiscount((long)discountAmount);
            }
            cartItemsRepository.save(cartItem);
            orderRepository.save(activeOrder);
            return activeOrder.getOrderDto();

        }

        return null;
    }

    public OrderDto decreaseProductQuantity(AddProductInCartDto addProductInCartDto) {
        // Find the active order for the user
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.Pending);
        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());

        Optional<CartItems> optionalCartItem = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                addProductInCartDto.getProductId(), activeOrder.getId(), addProductInCartDto.getUserId()
        );

        if (optionalProduct.isPresent() && optionalCartItem.isPresent()) {
            CartItems cartItem = optionalCartItem.get();
            Product product = optionalProduct.get();

            if (cartItem.getQuantity() > 1) {
                // Decrease quantity and update the order totals
                cartItem.setQuantity(cartItem.getQuantity() - 1);
                activeOrder.setAmount(activeOrder.getAmount() - product.getPrice());
                activeOrder.setTotalAmount(activeOrder.getTotalAmount() - product.getPrice());

                // Recalculate discount and net amount if a coupon is applied
                if (activeOrder.getCoupon() != null) {
                    double discountAmount = (activeOrder.getCoupon().getDiscount() / 100.0) * activeOrder.getTotalAmount();
                    double netAmount = activeOrder.getTotalAmount() - discountAmount;

                    activeOrder.setAmount(Math.round(netAmount));  // Ensure rounding to avoid issues
                    activeOrder.setDiscount(Math.round(discountAmount));
                }

                cartItemsRepository.save(cartItem);
                orderRepository.save(activeOrder);
                return activeOrder.getOrderDto();
            } else {
                // If quantity is 1, consider removing the item or handle accordingly
                // Here, you might want to either remove the item or set the quantity to 0
                // I'll remove the item in this example:

                cartItemsRepository.delete(cartItem);
                activeOrder.setAmount(activeOrder.getAmount() - product.getPrice());
                activeOrder.setTotalAmount(activeOrder.getTotalAmount() - product.getPrice());

                if (activeOrder.getCoupon() != null) {
                    double discountAmount = (activeOrder.getCoupon().getDiscount() / 100.0) * activeOrder.getTotalAmount();
                    double netAmount = activeOrder.getTotalAmount() - discountAmount;

                    activeOrder.setAmount(Math.round(netAmount));
                    activeOrder.setDiscount(Math.round(discountAmount));
                }

                orderRepository.save(activeOrder);
                return activeOrder.getOrderDto();
            }
        }

        return null;
    }

    public OrderDto deleteProductFromCart(AddProductInCartDto addProductInCartDto) {
        // Find the active order for the user
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.Pending);
        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());

        if (activeOrder != null && optionalProduct.isPresent()) {
            // Find the cart item for this product
            Optional<CartItems> optionalCartItem = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                    addProductInCartDto.getProductId(), activeOrder.getId(), addProductInCartDto.getUserId()
            );

            if (optionalCartItem.isPresent()) {
                CartItems cartItem = optionalCartItem.get();
                Product product = optionalProduct.get();

                // Remove the cart item from the repository
                cartItemsRepository.delete(cartItem);

                // Update the order totals
                activeOrder.setAmount(activeOrder.getAmount() - (product.getPrice() * cartItem.getQuantity()));
                activeOrder.setTotalAmount(activeOrder.getTotalAmount() - (product.getPrice() * cartItem.getQuantity()));

                // Recalculate discount and net amount if a coupon is applied
                if (activeOrder.getCoupon() != null) {
                    double discountAmount = (activeOrder.getCoupon().getDiscount() / 100.0) * activeOrder.getTotalAmount();
                    double netAmount = activeOrder.getTotalAmount() - discountAmount;

                    activeOrder.setAmount(Math.round(netAmount));
                    activeOrder.setDiscount(Math.round(discountAmount));
                }

                orderRepository.save(activeOrder);
                return activeOrder.getOrderDto();
            }
        }

        return null;
    }


    public OrderDto placeOrder(PlaceOrderDto placeOrderDto){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(placeOrderDto.getUserId(), OrderStatus.Pending);
        Optional<User> optionalUser = userRepository.findById(placeOrderDto.getUserId());
        if(optionalUser.isPresent()){
            activeOrder.setOrderDescription(placeOrderDto.getOrderDescription());
            activeOrder.setAddress(placeOrderDto.getAddress());
            activeOrder.setDate(new Date());
            activeOrder.setOrderStatus(OrderStatus.Placed);
            activeOrder.setTrackingId(UUID.randomUUID());

            orderRepository.save(activeOrder);

            Order order = new Order();
            order.setAmount(0L);
            order.setTotalAmount(0L);
            order.setDiscount(0L);
            order.setUser(optionalUser.get());
            order.setOrderStatus(OrderStatus.Pending);
            orderRepository.save(order);

            return activeOrder.getOrderDto();


        }
        return null;
    }

}
