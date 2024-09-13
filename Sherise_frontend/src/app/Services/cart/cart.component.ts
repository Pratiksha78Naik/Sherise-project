import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { MatDialog } from '@angular/material/dialog';

interface CartItem {
  processedImg:string;
  returnedImg: string;
  productName: string;
  price: number;
  quantity: number;
  productId: number;
}

interface Order {
  cartItems: CartItem[];
  totalAmount: number;
  discountAmount?: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  order: Order | undefined;
  discount: number = 0;
  shipping: number = 3.0;
  total: number = 0;
  couponForm!: FormGroup;
  isApplyingCoupon: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeCouponForm();
    this.checkLoginStatus();
  }

  initializeCouponForm(): void {
    this.couponForm = this.fb.group({
      code: ['', Validators.required],
    });
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.customerService.isLoggedIn(); // Assuming isLoggedIn() is a method in CustomerService
    if (this.isLoggedIn) {
      this.getCart();
    } else {
      this.snackbar.open('Please log in to view your cart.', 'Close', { duration: 5000 });
    }
  }

  applyCoupon(): void {
    if (this.couponForm.invalid) {
      this.snackbar.open('Please enter a valid coupon code.', 'Close', { duration: 3000 });
      return;
    }

    const couponCode = this.couponForm.get('code')!.value.trim();
    this.isApplyingCoupon = true;

    this.customerService
      .applyCoupon(couponCode)
      .pipe(
        catchError((error) => {
          this.isApplyingCoupon = false;
          const errorMessage = error.error?.message || 'Failed to apply coupon. Please try again.';
          this.snackbar.open(errorMessage, 'Close', { duration: 5000 });
          return of(null);
        })
      )
      .subscribe((res) => {
        this.isApplyingCoupon = false;
        if (res && res.success) {
          this.snackbar.open('Coupon applied successfully!', 'Close', { duration: 5000 });
          this.discount = res.discountAmount || 0;
          this.getCart();
        } else if (res && !res.success) {
          const errorMessage = res.message || 'Invalid coupon code.';
          this.snackbar.open(errorMessage, 'Close', { duration: 5000 });
        }
      });
  }

  getCart(): void {
    this.customerService
      .getCartByUserId()
      .pipe(
        catchError((error) => {
          this.snackbar.open('Failed to load cart. Please try again later.', 'Close', { duration: 3000 });
          return of({ cartItems: [], totalAmount: 0 });
        })
      )
      .subscribe((res) => {
        this.order = res;
        this.cartItems = res.cartItems.map((item: any) => ({
          ...item,
          processedImg: 'data:image/jpeg;base64,' + item.returnedImg,
        }));
        this.discount = res.discountAmount || 0;
        this.total = res.totalAmount;
      });
  }

  increaseQuantity(productId: any): void {
    this.customerService.increaseProductQuantity(productId).subscribe((res) => {
      this.snackbar.open('Product quantity increased.', 'Close', { duration: 5000 });
      this.getCart();
    });
  }

  decreaseQuantity(productId: any): void {
    this.customerService.decreaseProductQuantity(productId).subscribe(
      (res) => {
        if (res) {
          this.snackbar.open('Product quantity decreased.', 'Close', { duration: 5000 });
        } else {
          this.snackbar.open('Product removed from cart.', 'Close', { duration: 5000 });
        }
        this.getCart();
      },
      (error) => {
        this.snackbar.open('Failed to decrease product quantity.', 'Close', { duration: 5000 });
        console.error('Error decreasing product quantity:', error);
      }
    );
  }

  deleteProduct(productId: any): void {
    this.customerService.deleteProductFromCart(productId).subscribe(
      (res) => {
        if (res) {
          this.snackbar.open('Product removed from cart.', 'Close', { duration: 5000 });
        } else {
          this.snackbar.open('Failed to remove product from cart.', 'Close', { duration: 5000 });
        }
        this.getCart();
      },
      (error) => {
        this.snackbar.open('Failed to remove product from cart.', 'Close', { duration: 5000 });
        console.error('Error deleting product from cart:', error);
      }
    );
  }

 placeOrder() {
  if (this.order) {
    this.dialog.open(PlaceOrderComponent, {
      data: { totalAmount: this.order.totalAmount }
    });
  }
}


  proceedToCheckout(): void {
    this.snackbar.open('Proceeding to checkout...', 'Close', { duration: 3000 });
  }
}
