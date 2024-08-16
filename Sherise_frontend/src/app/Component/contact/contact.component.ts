import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
          this.submissionMessage = 'Message sent successfully!';
          this.contactForm.reset();
        },
        error => {
          this.submissionMessage = 'Error sending message. Please try again later.';
        }
      );
    } else {
      this.submissionMessage = 'Please fill out the form correctly.';
    }
  }
}
