import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Correct Router import
import { AuthService } from '../Services/auth/auth.service'; // Ensure correct path
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        // SweetAlert for success notification
        Swal.fire({
          icon: 'success',
          title: 'Sign up successful!',
          text: 'Welcome aboard! Redirecting you to the login page...',
          timer: 3000,
          showConfirmButton: false
        });

        // Navigate to the login page after success
        this.router.navigateByUrl("/login");
      },
      (error) => {
        // SweetAlert for error notification
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email ID already registered. Please try a different one!',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
