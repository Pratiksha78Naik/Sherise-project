package com.backend.demo.Entity;

import com.backend.demo.dto.OrderDto;
import com.backend.demo.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @Column(unique = true)
    private UUID trackingId;

    private String razorpayOrderId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "coupon_id", referencedColumnName = "id")
    @JsonManagedReference
    private Coupon coupon;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CartItems> cartItems;

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
