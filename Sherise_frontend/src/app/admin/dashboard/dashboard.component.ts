import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: any[] = [];
  searchProductForm!: FormGroup;
  updateProductForm!: FormGroup;
  @ViewChild('updateProductDialog') updateProductDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  currentProduct: any;

  constructor(
    private adminService: AdminService, 
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });

    this.updateProductForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      price: [null, [Validators.required]],
      categoryId: [null]
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
          panelClass: 'error-snackbar'
        });
        console.error('Delete error:', err);
      }
    });
  }

  openUpdateDialog(product: any) {
    this.currentProduct = product;
    this.updateProductForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId
    });
    this.dialogRef = this.dialog.open(this.updateProductDialog, {
      width: '500px',
      disableClose: true
    });
  }

  updateProduct() {
    if (this.updateProductForm.valid) {
      const productDto = this.updateProductForm.value;
      const productId = this.currentProduct.id; // Assuming this holds the current product ID
      this.adminService.updateProduct(productId, productDto).subscribe({
        next: () => {
          this.snackbar.open('Product updated successfully', 'Close', {
            duration: 5000
          });
          this.closeUpdateDialog(); // Close the dialog
          this.getAllProducts(); // Refresh product list
        },
        error: (err) => {
          this.snackbar.open('Failed to update product', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
          console.error('Update error:', err);
        }
      });
    }
  }
  
  closeUpdateDialog() {
    this.dialogRef.close();
  }
}
