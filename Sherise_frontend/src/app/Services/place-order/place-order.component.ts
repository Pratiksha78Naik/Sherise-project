import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  orderForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null]
    });
  }

  placeOrder() {
    const addressControl = this.orderForm.get('address');
    if (addressControl) {
      this.customerService.placeOrder(this.orderForm.value).subscribe({
        next: (res) => {
          if (res.id) {
            this.snackBar.open("Order placed successfully", "Close", { duration: 5000 });
            this.router.navigateByUrl("/customer/my-orders");
            this.closeForm();
          } else {
            this.snackBar.open("Something went wrong", "Close", { duration: 5000 });
          }
        },
        error: (err) => {
          this.snackBar.open("An error occurred", "Close", { duration: 5000 });
        }
      });
    }
  }

  closeForm() {
    this.dialog.closeAll();
  }
}
