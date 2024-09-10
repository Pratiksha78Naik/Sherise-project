package com.backend.demo.services.razorpay;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RazorpayServiceImpl implements RazorpayService {

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;

    private RazorpayClient getRazorpayClient() throws RazorpayException {
        return new RazorpayClient(apiKey, apiSecret);
    }

    @Override
    public JSONObject createOrder(Long amount) throws RazorpayException, JSONException {
        RazorpayClient client = getRazorpayClient();

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // Amount in paise (1 INR = 100 paise)
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "order_rcptid_11");

        try {
            // Create the order and return the response as a JSONObject
            return client.Orders.create(orderRequest).toJson();
        } catch (RazorpayException e) {
            // Handle exception appropriately
            throw new RazorpayException("Error creating Razorpay order", e);
        }
    }
}
