import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  listofCategories: any = []; // To store fetched categories
  showForm: boolean = false;  // Control the visibility of the form

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    this.getAllCategories(); // Fetch categories on initialization
  }

  // Method to fetch all categories
  getAllCategories(): void {
    this.adminService.getAllCategory().subscribe(res => {
      this.listofCategories = res;
    });
  }

  // Method to toggle the form visibility
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      this.adminService.addCategory(this.categoryForm.value).subscribe(res => {
        if (res.id != null) {
          this.snackBar.open('Category posted successfully!', 'Close', {
            duration: 5000
          });
          this.getAllCategories(); // Refresh the categories list
          this.showForm = false; // Hide the form after submission
        }
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }


  deleteCategory(categoryId: any): void {
    this.adminService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.snackBar.open('Category deleted successfully', 'Close', {
          duration: 5000
        });
        this.getAllCategories(); // Refresh category list
      },
      error: (err) => {
        this.snackBar.open('Failed to delete category', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar' // Define this class in your CSS for error styling
        });
        console.error('Delete error:', err); // Log the error for debugging
      }
    });
  }
  

}
