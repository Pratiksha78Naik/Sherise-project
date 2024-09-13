import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  private apiUrl = 'http://localhost:8080/contact/ContactForm'; // Replace with your actual API endpoint
  submissionMessage = '';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

 onSubmit() {
    if (this.contactForm.valid) {
      this.http.post(this.apiUrl, this.contactForm.value).subscribe(
        response => {
          // SweetAlert success popup
          Swal.fire({
            title: 'Success!',
            text: 'Message sent successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.contactForm.reset();
        },
        error => {
          // SweetAlert error popup
          Swal.fire({
            title: 'Error!',
            text: 'Error sending message. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      // SweetAlert validation error popup
      Swal.fire({
        title: 'Form Incomplete',
        text: 'Please fill out the form correctly.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
}
