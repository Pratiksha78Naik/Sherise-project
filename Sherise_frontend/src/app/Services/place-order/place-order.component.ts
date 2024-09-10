import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  orderForm!: FormGroup;
  orderAmount: number = 0; // To store the total amount passed from CartComponent

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { totalAmount: number } // Inject the data from CartComponent
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null]
    });

    this.orderAmount = this.data.totalAmount; // Set the totalAmount passed from CartComponent
  }

  handlePayment() {
    if (this.orderForm.invalid) {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 5000 });
      return;
    }

    // Configure Razorpay options
    const options: any = {
      key: 'rzp_test_GbzMAhkysTbe34', // Replace with your Razorpay Key ID
      amount: this.orderAmount * 100, // Amount in paise (e.g., 1000 paise = ₹10)
      currency: 'INR',
      name: 'SheRise',
      description: 'Order Payment',
      handler: (response: any) => {
        this.placeOrder(response.razorpay_payment_id); // Pass payment ID to the server
      },
      prefill: {
        name: '', // Optionally fill in with user details if available
        email: '',
        contact: ''
      },
      theme: {
        color: '#3399cc'
      },
      modal: {
        ondismiss: () => {
          console.log('Payment modal closed');
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  placeOrder(paymentId: string) {
    const orderDto = {
      ...this.orderForm.value,
      paymentId: paymentId, // Attach Razorpay payment ID
      amount: this.orderAmount // Attach the total amount
    };

    this.customerService.placeOrder(orderDto).subscribe({
      next: (res) => {
        if (res && res.id) {
          this.snackBar.open("Order placed successfully", "Close", { duration: 5000 });
          this.router.navigateByUrl("/my-orders");
          this.closeForm();
        } else {
          this.snackBar.open("Something went wrong", "Close", { duration: 5000 });
        }
      },
      error: (err) => {
        console.error('Order placement error:', err);
        this.snackBar.open("An error occurred while placing the order", "Close", { duration: 5000 });
      }
    });
  }

  closeForm() {
    this.dialog.closeAll();
  }
}
