import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Corrected to styleUrls
})
export class DashboardComponent implements OnInit {

  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(
    private adminService: AdminService, 
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe(res => {
      res.forEach((element: { processedImg: string; byteImg: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    });
  }

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllProductsByName(title).subscribe(res => {
      res.forEach((element: { processedImg: string; byteImg: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    });
  }

  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).subscribe({
      next: () => {
        this.snackbar.open('Product deleted successfully', 'Close', {
          duration: 5000
        });
        this.getAllProducts(); // Refresh product list
      },
      error: (err) => {
        this.snackbar.open('Failed to delete product', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar' // You can define this class in your CSS
        });
        console.error('Delete error:', err); // Log the error for debugging
      }
    });
  }
}
