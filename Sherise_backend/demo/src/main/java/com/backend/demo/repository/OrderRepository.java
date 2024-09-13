package com.backend.demo.repository;


import com.backend.demo.Entity.Order;
import com.backend.demo.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findByUserIdAndOrderStatus(Long userId, OrderStatus orderStatus);

    List<Order> findAllByOrderStatusIn(List<OrderStatus> orderStatusList);

    List<Order>findAllByUserIdAndOrderStatusIn(Long userId, List<OrderStatus> orderStatusList);

    @Query("SELECT o.trackingId FROM Order o")
    List<UUID> findAllTrackingIds();

    boolean existsByTrackingId(UUID trackingId);


}

