package com.backend.demo.Entity;

import com.backend.demo.dto.OrderDto;
import com.backend.demo.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderDescription;
    private Date date;
    private Long amount;
    private String address;
    private String payment;
    private OrderStatus orderStatus;
    private Long totalAmount;
    private Long discount;

    @Column(unique = true)  // Ensure trackingId is unique
    private UUID trackingId;

    private String razorpayOrderId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)  // Changed from OneToOne to ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;  // Ensure User entity has a matching id column

    @ManyToOne(fetch = FetchType.LAZY, optional = true)  // Changed from OneToOne to ManyToOne
    @JoinColumn(name = "coupon_id", referencedColumnName = "id")
    private Coupon coupon;  // Ensure Coupon entity has a matching id column

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItems> cartItems;  // Ensure CartItems entity has a matching order field

    public OrderDto getOrderDto() {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(id);
        orderDto.setOrderDescription(orderDescription);
        orderDto.setAddress(address);
        orderDto.setTrackingId(trackingId);
        orderDto.setAmount(amount);
        orderDto.setDate(date);
        orderDto.setOrderStatus(orderStatus);
        orderDto.setRazorpayOrderId(razorpayOrderId);

        if (user != null) {
            orderDto.setUserName(user.getName());  // Ensure User has a getName() method
        }

        if (coupon != null) {
            orderDto.setCouponName(coupon.getName());  // Ensure Coupon has a getName() method
        }

        return orderDto;
    }
}
