import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { UserStorageService } from '../storage/user-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
        this.products = res.map((element: { processedImg: string; byteImg: string; }) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          return element;
        });
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products', error);
        Swal.fire('Error', 'Failed to load products', 'error');
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
          Swal.fire('Error', 'Failed to search for products', 'error');
        }
      );
    } else {
      Swal.fire('Warning', 'Please enter a valid product title', 'warning');
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
        Swal.fire('Error', 'Failed to load categories', 'error');
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
        Swal.fire('Error', 'Failed to load products by category', 'error');
      }
    );
  }

  addToCart(productId: number): void {
    this.customerService.addToCart(productId).subscribe(
      res => {
        console.log('Response from addToCart:', res);
        Swal.fire('Success', 'Product added to cart successfully', 'success');
        this.router.navigate(['/cart']);
      },
      error => {
        console.error('Error adding product to cart:', error);
        Swal.fire('Error', 'Failed to add product to cart', 'error');
        this.router.navigate(['/cart']);
      }
    );
  }

}
