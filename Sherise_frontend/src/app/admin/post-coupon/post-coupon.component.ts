import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-post-coupon',
  templateUrl: './post-coupon.component.html',
  styleUrls: ['./post-coupon.component.css']
})
export class PostCouponComponent implements OnInit {
  couponForm!: FormGroup;
  listOfCoupons: any = []; // To store fetched coupons
  showForm: boolean = false;  // Control the visibility of the form

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]],
    });

    this.getAllCoupons(); // Fetch coupons on initialization
  }

  // Method to fetch all coupons
  getAllCoupons(): void {
    this.adminService.getCoupons().subscribe(res => {
      this.listOfCoupons = res;
    });
  }

  // Method to toggle the form visibility
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addCoupon(): void {
    if (this.couponForm.valid) {
      this.adminService.addCoupon(this.couponForm.value).subscribe(res => {
        if (res.id != null) {
          this.snackBar.open('Coupon added successfully!', 'Close', {
            duration: 5000
          });
          this.getAllCoupons(); // Refresh the coupons list
          this.showForm = false; // Hide the form after submission
        }
      });
    } else {
      this.couponForm.markAllAsTouched();
    }
  }

  // deleteCoupon(couponId: any): void {
  //   this.adminService.deleteCoupon(couponId).subscribe({
  //     next: () => {
  //       this.snackBar.open('Coupon deleted successfully', 'Close', {
  //         duration: 5000
  //       });
  //       this.getAllCoupons(); // Refresh coupon list
  //     },
  //     error: (err) => {
  //       this.snackBar.open('Failed to delete coupon', 'Close', {
  //         duration: 5000,
  //         panelClass: 'error-snackbar' // Define this class in your CSS for error styling
  //       });
  //       console.error('Delete error:', err); // Log the error for debugging
  //     }
  //   });
  // }
}
