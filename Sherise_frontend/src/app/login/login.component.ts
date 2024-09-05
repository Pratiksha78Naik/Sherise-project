import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth/auth.service';
import { UserStorageService } from '../Services/storage/user-storage.service';
import Swal from 'sweetalert2';  // Import SweetAlert

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userStorageService: UserStorageService  // Injecting UserStorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const username = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(username, password).subscribe(
      (res) => {
        if (res.token && res.user) {
          // Save the token and user data to local storage
          this.userStorageService.saveToken(res.token);
          this.userStorageService.saveUser(res.user);

          // Get the user's name from the storage
          const userName = this.userStorageService.getUserName();

          // Display SweetAlert welcome message in the center
          Swal.fire({
            icon: 'success',
            title: `Welcome, ${userName || 'Friend'}! 🎉`,
            text: `We're glad to see you!`,
            timer: 3000,
            showConfirmButton: false
          });

          // Redirect based on user role
          if (this.userStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
          } else if (this.userStorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('home');
          } else {
            this.router.navigateByUrl('/');  // Redirect to a default route or error page
          }
        }
      },
      (error) => {
        // Show SweetAlert error popup in the center
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Bad credentials. Please try again!',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
