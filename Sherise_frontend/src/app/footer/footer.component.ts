import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  showFooter: boolean = true;
  subscriberEmail: string = '';
  message: string = '';

  private apiUrl = 'http://localhost:8080/subscribe/subscribeUser'; // Replace with your actual backend URL

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showFooter = !(event.url === '/login' || event.url === '/signup' || event.url.startsWith('/admin'));
      }
    });
  }

  onSubscribe(): void {
    if (this.subscriberEmail) {
      const payload = { email: this.subscriberEmail };
      this.http.post(this.apiUrl, payload)
        .subscribe({
          next: () => {
            // Show success alert
            Swal.fire({
              icon: 'success',
              title: 'Subscribed!',
              text: 'You have successfully subscribed to our newsletter!',
              confirmButtonText: 'OK'
            });
            this.subscriberEmail = ''; // Clear the input field
          },
          error: () => {
            // Show error alert
            Swal.fire({
              icon: 'error',
              title: 'Subscription Failed!',
              text: 'There was an issue with your subscription. Please try again.',
              confirmButtonText: 'OK'
            });
          }
        });
    } else {
      // Show an alert if email is empty
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email!',
        text: 'Please enter a valid email address.',
        confirmButtonText: 'OK'
      });
    }
  }
}
