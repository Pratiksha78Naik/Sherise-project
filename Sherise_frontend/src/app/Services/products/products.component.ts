import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { CustomerService } from '../customer.service';
import { UserStorageService } from '../storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  searchProductForm!: FormGroup;
  listofCategories: any[] = [];
  userId: string | null = null;
  selectedCategoryId: number | null = null;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private userStorageService: UserStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.userStorageService.getUserId();
    console.log('Retrieved User ID:', this.userId);

    this.initializeForm();
    this.getAllProducts();
    this.getAllCategories();
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
        this.products = res.map((element: any) => {
          if (element.byteImg) {
            element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          }
          return element;
        });
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to load products',
          text: error.message,
          confirmButtonText: 'Close'
        });
      }
    );
  }

  submitForm() {
    if (this.searchProductForm.valid) {
      this.products = [];
      const title = this.searchProductForm.get('title')!.value;
      this.customerService.getAllProductsByName(title).subscribe(
        res => {
          this.products = res.map((element: any) => {
            if (element.byteImg) {
              element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
            }
            return element;
          });
          console.log(this.products);
        },
        error => {
          console.error('Error searching for products', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to search for products',
            text: error.message,
            confirmButtonText: 'Close'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'Please enter a valid product title',
        confirmButtonText: 'Close'
      });
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
        Swal.fire({
          icon: 'error',
          title: 'Failed to load categories',
          text: error.message,
          confirmButtonText: 'Close'
        });
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
        this.products = res.map((element: any) => {
          if (element.byteImg) {
            element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          }
          return element;
        });
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products by category', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to load products by category',
          text: error.message,
          confirmButtonText: 'Close'
        });
      }
    );
  }

  addToCart(productId: number): void {
    this.customerService.addToCart(productId).subscribe(
      response => {
        if (response.status === 201) {
          console.log('Product added to cart successfully:', response.body);
          Swal.fire({
            icon: 'success',
            title: 'Product added to cart successfully',
            text: 'Redirecting to cart...',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/cart']); // Redirect to cart
          });
        } else {
          console.log('Unexpected status code:', response.status);
          Swal.fire({
            icon: 'info',
            title: 'Product added to cart',
            text: 'Product added to cart, but unexpected response',
            confirmButtonText: 'Close'
          });
        }
      },
      error => {
        console.error('Error adding product to cart:', error);
        Swal.fire({
          icon: 'error',
          title: 'you need to login first',
          text: error.message,
          confirmButtonText: 'Close'
        });
      }
    );
  }
}
