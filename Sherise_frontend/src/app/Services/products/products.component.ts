import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../customer.service';
import { UserStorageService } from '../storage/user-storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  searchProductForm!: FormGroup;
  userId: string | null = null;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit() {
    this.userId = this.userStorageService.getUserId();
    console.log('Retrieved User ID:', this.userId);

    this.initializeForm();
    this.getAllProducts();
  }

  initializeForm() {
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });
  }

  getAllProducts() {
    this.products = [];
    this.customerService.getAllProducts().subscribe(
      res => {
        this.products = res.map((element: { processedImg: string; byteImg: string; }) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          return element;
        });
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products', error);
        this.snackbar.open("Failed to load products", "Close", { duration: 5000 });
      }
    );
  }

  submitForm() {
    if (this.searchProductForm.valid) {
      this.products = [];
      const title = this.searchProductForm.get('title')!.value;
      this.customerService.getAllProductsByName(title).subscribe(
        res => {
          this.products = res.map((element: { processedImg: string; byteImg: string; }) => {
            element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
            return element;
          });
          console.log(this.products);
        },
        error => {
          console.error('Error searching for products', error);
          this.snackbar.open("Failed to search for products", "Close", { duration: 5000 });
        }
      );
    } else {
      this.snackbar.open("Please enter a valid product title", "Close", { duration: 5000 });
    }
  }

  // addToCart(productId: number): void {
  //   const token = this.userStorageService.getToken();
  //   const userId = this.userStorageService.getUserId();
  
  //   console.log('Retrieved Token:', token);
  //   console.log('Retrieved User ID:', userId);
  
  //   if (token && userId) {
  //     this.customerService.addToCart(productId).subscribe(
  //       res => {
  //         this.snackbar.open('Product added to cart successfully', 'Close', { duration: 5000 });
  //       },
  //       error => {
  //         console.error('Error adding product to cart', error);
  //         this.snackbar.open('Failed to add product to cart', 'Close', { duration: 5000 });
  //       }
  //     );
  //   } else {
  //     this.snackbar.open('User not logged in', 'Close', { duration: 5000 });
  //   }
  // }
}
