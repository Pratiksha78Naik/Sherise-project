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
        orderRequest.put("receipt", "order_rcptid_" + System.currentTimeMillis());

        try {
            JSONObject orderResponse = client.Orders.create(orderRequest).toJson();

            // Check if the response contains the required fields
            if (orderResponse.has("id") && orderResponse.has("amount") && orderResponse.has("currency")) {
                return orderResponse;
            } else {
                throw new RazorpayException("Razorpay order creation response is missing required fields.");
            }
        } catch (RazorpayException e) {
            // Log the exception and rethrow it with additional context
            throw new RazorpayException("Error creating Razorpay order: " + e.getMessage(), e);
        }
    }
}
