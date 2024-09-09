package com.backend.demo.services.admin.adminOrder;

import com.backend.demo.dto.OrderDto;

import java.util.List;


public interface AdminOrderService  {

    List<OrderDto> getAllPlaceOrders();
    OrderDto changeOrderStatus(Long orderId, String status);
}
