import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent {
  donateForm: FormGroup;
  private apiUrl = 'https://sherise-app-latest.onrender.com/donation/donate'; // Replace with your actual API endpoint
  submissionMessage = '';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.donateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  pay() {
    if (this.donateForm.valid) {
      const amount = this.donateForm.get('amount')?.value;
      const options = {
        key: 'rzp_test_GbzMAhkysTbe34', // Replace with your Razorpay key
        amount: Number(amount) * 100, // Amount in paise
        currency: 'INR',
        name: 'Your Organization Name',
        description: 'Donation',
        handler: (response: any) => {
          // Send payment details to backend
          this.http.post(this.apiUrl, {
            name: this.donateForm.get('name')?.value,
            email: this.donateForm.get('email')?.value,
            phone: this.donateForm.get('phone')?.value,
            amount: Number(amount),
            paymentId: response.razorpay_payment_id
          }).subscribe(
            response => {
              this.submissionMessage = 'Payment successful and email sent!';
              this.donateForm.reset();
            },
            error => {
              this.submissionMessage = 'Error processing payment.';
            }
          );
        },
        prefill: {
          name: this.donateForm.get('name')?.value,
          email: this.donateForm.get('email')?.value,
          contact: this.donateForm.get('phone')?.value
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } else {
      this.submissionMessage = 'Please fill out the form correctly.';
    }
  }
}
