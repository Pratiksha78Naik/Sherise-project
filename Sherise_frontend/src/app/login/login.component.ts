import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth/auth.service';
import { UserStorageService } from '../Services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]], // Added email validation
      password: [null, Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      this.authService.login(username, password).subscribe(
        (response) => {
          if (response) {
            const { token, user } = response;
            if (token && user) {
              this.userStorageService.saveToken(token); // Save token
              this.userStorageService.saveUser(user);   // Save user info

              if (this.userStorageService.isAdminLoggedIn()) {
                this.router.navigateByUrl('admin/dashboard');
              } else if (this.userStorageService.isCustomerLoggedIn()) {
                this.router.navigateByUrl('home');
              }
            } else {
              this.snackBar.open('Login failed. Please check your credentials.', 'Close', { duration: 5000 });
            }
          } else {
            this.snackBar.open('Login failed. Please check your credentials.', 'Close', { duration: 5000 });
          }
        },
        (error) => {
          this.snackBar.open('Login error. Please try again later.', 'Close', { duration: 5000 });
          console.error('Login error:', error); // Log error for debugging
        }
      );
    } else {
      this.snackBar.open('Please enter a valid email and password.', 'Close', { duration: 5000 });
    }
  }
}
