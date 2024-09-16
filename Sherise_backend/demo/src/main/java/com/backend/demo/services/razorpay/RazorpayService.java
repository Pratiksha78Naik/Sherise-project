package com.backend.demo.services.razorpay;

import org.json.JSONException;
import org.json.JSONObject;
import com.razorpay.RazorpayException;

public interface RazorpayService {
    JSONObject createOrder(Long amount) throws RazorpayException, JSONException;
}
