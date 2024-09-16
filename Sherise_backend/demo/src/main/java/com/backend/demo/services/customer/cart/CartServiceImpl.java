package com.backend.demo.services.customer.cart;

import com.backend.demo.Entity.*;
import com.backend.demo.dto.AddProductInCartDto;
import com.backend.demo.dto.CartItemsDto;
import com.backend.demo.dto.OrderDto;
import com.backend.demo.dto.PlaceOrderDto;
import com.backend.demo.enums.OrderStatus;
import com.backend.demo.exceptions.ValidationException;
import com.backend.demo.repository.*;
import com.backend.demo.services.razorpay.RazorpayService;

import com.razorpay.RazorpayException;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
// Import Date and other necessary classes
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    @Autowired
    private RazorpayService razorpayService;

    @Autowired
    private PlaceOrderMailService placeOrderMailService; // Added missing Autowired field

    private static final Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);

    public ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto) {
        try {
            // Fetch the current active order for the user
            Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.Pending);

            // Check if the active order is null or the previous order is completed (Placed, Shipped, Delivered)
            if (activeOrder == null || isCompletedOrder(activeOrder)) {
                // Generate a new unique tracking ID
                UUID newTrackingId = generateUniqueTrackingId();

                // Create a new order for the user
                User user = userRepository.findById(addProductInCartDto.getUserId())
                        .orElseThrow(() -> new RuntimeException("User not found"));
                activeOrder = new Order();
                activeOrder.setUser(user);
                activeOrder.setOrderStatus(OrderStatus.Pending);
                activeOrder.setTotalAmount(0L);
                activeOrder.setAmount(0L);
                activeOrder.setTrackingId(newTrackingId);
                activeOrder = orderRepository.save(activeOrder);
            }

            // Fetch the product
            Product product = productRepository.findById(addProductInCartDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // Check if the product is already in the cart for this order
            CartItems cartItem = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                            addProductInCartDto.getProductId(), activeOrder.getId(), addProductInCartDto.getUserId())
                    .orElse(new CartItems());

            if (cartItem.getId() != null) {
                // Product is already in the cart, update the quantity and price
                cartItem.setQuantity(cartItem.getQuantity() + 1);
                cartItem.setPrice(cartItem.getPrice() + product.getPrice());
            } else {
                // Product is not in the cart, add it as a new item
                cartItem.setProduct(product);
                cartItem.setPrice(product.getPrice());
                cartItem.setQuantity(1L);
                cartItem.setUser(activeOrder.getUser());
                cartItem.setOrder(activeOrder);
                activeOrder.getCartItems().add(cartItem);
            }

            // Save the cart item and update the order
            cartItemsRepository.save(cartItem);
            activeOrder.setTotalAmount(activeOrder.getTotalAmount() + product.getPrice());
            activeOrder.setAmount(activeOrder.getAmount() + product.getPrice());
            orderRepository.save(activeOrder);

            return ResponseEntity.status(HttpStatus.CREATED).body("Product added to cart successfully.");
        } catch (Exception e) {
            // Log the exception for debugging
            logger.error("Error adding product to cart: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the product to the cart.");
        }
    }

    // Helper method to check if the order is completed
    private boolean isCompletedOrder(Order order) {
        return order.getOrderStatus() == OrderStatus.Placed ||
                order.getOrderStatus() == OrderStatus.Shipped ||
                order.getOrderStatus() == OrderStatus.Delivered;
    }

    // Helper method to generate unique tracking ID
    private UUID generateUniqueTrackingId() {
        UUID trackingId;
        do {
            trackingId = UUID.randomUUID(); // Generate new UUID
        } while (orderRepository.existsByTrackingId(trackingId)); // Check if it already exists
        return trackingId;
    }

    public OrderDto getCartByUserId(Long userId) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.Pending);
        if (activeOrder == null) {
            return null; // Or throw an exception if preferred
        }
        List<CartItemsDto> cartItemsDtoList = activeOrder.getCartItems().stream().map(CartItems::getCartDto).collect(Collectors.toList());
        OrderDto orderDto = new OrderDto();
        orderDto.setAmount(activeOrder.getAmount());
        orderDto.setId(activeOrder.getId());
        orderDto.setOrderStatus(activeOrder.getOrderStatus());
        orderDto.setDiscount(activeOrder.getDiscount());
        orderDto.setTotalAmount(activeOrder.getTotalAmount());
        orderDto.setCartItems(cartItemsDtoList);
        if (activeOrder.getCoupon() != null) {
            orderDto.setCouponName(activeOrder.getCoupon().getName());
        }

        return orderDto;
    }

    public OrderDto applyCoupon(Long userId, String code) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.Pending);
        if (activeOrder == null) {
            throw new ValidationException("No active order found.");
        }
        Coupon coupon = couponRepository.findByCode(code).orElseThrow(() -> new ValidationException("Coupon not found."));

        if (couponIsExpired(coupon)) {
            throw new ValidationException("Coupon has expired.");
        }

        double discountAmount = ((coupon.getDiscount() / 100.0) * activeOrder.getTotalAmount());
        double netAmount = activeOrder.getTotalAmount() - discountAmount;

        activeOrder.setAmount((long) netAmount);
        activeOrder.setDiscount((long) discountAmount);
        activeOrder.setCoupon(coupon);

        orderRepository.save(activeOrder);
        return activeOrder.getOrderDto();
    }

    private boolean couponIsExpired(Coupon coupon) {
        Date currentDate = new Date();
        Date expirationDate = coupon.getExpirationDate();

        return expirationDate != null && currentDate.after(expirationDate);
    }

    public OrderDto increaseProductQuantity(AddProductInCartDto addProductInCartDto) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.Pending);
        if (activeOrder == null) {
            throw new ValidationException("No active order found.");
        }

        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());
        Optional<CartItems> optionalCartItem = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                addProductInCartDto.getProductId(), activeOrder.getId(), addProductInCartDto.getUserId()
        );

        if (optionalProduct.isPresent() && optionalCartItem.isPresent()) {
            CartItems cartItem = optionalCartItem.get();
            Product product = optionalProduct.get();

            activeOrder.setAmount(activeOrder.getAmount() + product.getPrice());
            activeOrder.setTotalAmount(activeOrder.getTotalAmount() + product.getPrice());

            cartItem.setQuantity(cartItem.getQuantity() + 1);

            if (activeOrder.getCoupon() != null) {
                double discountAmount = ((activeOrder.getCoupon().getDiscount() / 100.0) * activeOrder.getTotalAmount());
                double netAmount = activeOrder.getTotalAmount() - discountAmount;

                activeOrder.setAmount((long) netAmount);
                activeOrder.setDiscount((long) discountAmount);
            }
            cartItemsRepository.save(cartItem);
            orderRepository.save(activeOrder);
            return activeOrder.getOrderDto();
        }

        return null;
    }

    public OrderDto decreaseProductQuantity(AddProductInCartDto addProductInCartDto) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.Pending);
        if (activeOrder == null) {
            throw new ValidationException("No active order found.");
        }

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

                    activeOrder.setAmount(Math.round(netAmount));
                    activeOrder.setDiscount(Math.round(discountAmount));
                }

                cartItemsRepository.save(cartItem);
                orderRepository.save(activeOrder);
                return activeOrder.getOrderDto();
            } else {
                // Remove the item if quantity is 1
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
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.Pending);
        if (activeOrder == null) {
            throw new ValidationException("No active order found.");
        }

        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());
        if (optionalProduct.isPresent()) {
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

    public ResponseEntity<?> placeOrder(PlaceOrderDto placeOrderDto) {
        try {
            // Find the active order for the user
            Order activeOrder = orderRepository.findByUserIdAndOrderStatus(placeOrderDto.getUserId(), OrderStatus.Pending);

            if (activeOrder == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No pending order found for this user.");
            }

            // Set additional details from placeOrderDto
            activeOrder.setAddress(placeOrderDto.getAddress());
            activeOrder.setOrderDescription(placeOrderDto.getOrderDescription());

            // Generate a unique tracking ID
            UUID trackingId = UUID.randomUUID();
            activeOrder.setTrackingId(trackingId);

            // Process payment through Razorpay
            JSONObject razorpayOrder = razorpayService.createOrder(activeOrder.getAmount());
            String razorpayOrderId = razorpayOrder.getString("id"); // Extract Razorpay Order ID

            // Set the Razorpay Order ID and tracking ID in your Order entity
            activeOrder.setRazorpayOrderId(razorpayOrderId);

            // Set date and payment details
            activeOrder.setDate(new Date()); // Set current date
            activeOrder.setPayment("Razorpay"); // Set payment type

            // Update order status to 'Placed'
            activeOrder.setOrderStatus(OrderStatus.Placed);
            orderRepository.save(activeOrder);

            // Send order confirmation email
            placeOrderMailService.sendOrderConfirmationEmail(activeOrder);

            // Return response with the tracking ID and other details
            return ResponseEntity.status(HttpStatus.CREATED).body("Order placed successfully. Tracking ID: " + trackingId.toString());
        } catch (RazorpayException | JSONException e) {
            // Log the exception and return a detailed error message
            logger.error("Error occurred while placing the order", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while placing the order: " + e.getMessage());
        }
    }

    public List<OrderDto> getMyPlacedOrders(Long userId) {
        // Define the valid order statuses
        List<OrderStatus> orderStatusList = List.of(OrderStatus.Placed, OrderStatus.Shipped, OrderStatus.Delivered);

        // Call the corrected method from OrderRepository and map Orders to OrderDto
        return orderRepository.findAllByUserIdAndOrderStatusIn(userId, orderStatusList)
                .stream()
                .map(Order::getOrderDto)
                .collect(Collectors.toList());
    }

}
