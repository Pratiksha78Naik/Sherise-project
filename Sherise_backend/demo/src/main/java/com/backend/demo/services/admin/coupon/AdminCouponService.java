package com.backend.demo.services.admin.coupon;

import com.backend.demo.Entity.Coupon;

import java.util.List;

public interface AdminCouponService {


    Coupon createCoupon(Coupon  coupon);

    List<Coupon> getAllCoupons();
}
