import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../customer.service';
import { UserStorageService } from '../storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  searchProductForm!: FormGroup;
  listofCategories: any[] = []; // Changed to array
  userId: string | null = null;
  selectedCategoryId: number | null = null; // Track selected category

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private userStorageService: UserStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.userStorageService.getUserId();
    console.log('Retrieved User ID:', this.userId);

    this.initializeForm();
    this.getAllProducts();
    this.getAllCategories();  // Added call to fetch categories
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



  getAllCategories(): void {
    this.customerService.getAllCategory().subscribe(
      res => {
        this.listofCategories = res;
        console.log('Fetched Categories:', this.listofCategories);
      },
      error => {
        console.error('Error fetching categories', error);
        this.snackbar.open("Failed to load categories", "Close", { duration: 5000 });
      }
    );
  }

  filterByCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    if (this.selectedCategoryId !== null) {
      this.getProductsByCategory(this.selectedCategoryId);
    }
  }

  getProductsByCategory(categoryId: number) {
    this.customerService.getProductsByCategory(categoryId).subscribe(
      res => {
        this.products = res.map((element: { processedImg: string; byteImg: string; }) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          return element;
        });
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products by category', error);
        this.snackbar.open("Failed to load products by category", "Close", { duration: 5000 });
      }
    );
  }


  addToCart(productId: number): void {
    this.customerService.addToCart(productId).subscribe(
      res => {
        // Assuming `res` indicates success
        console.log('Response from addToCart:', res);
        this.snackbar.open('Product added to cart successfully', 'Close', { duration: 5000 });
        this.router.navigate(['/cart']);
      },
      error => {
        // Handle error from service
        console.error('Error adding product to cart:', error);
        this.snackbar.open('Failed to add product to cart', 'Close', { duration: 5000 });
        this.router.navigate(['/cart']);
      }
    );
  }

}
