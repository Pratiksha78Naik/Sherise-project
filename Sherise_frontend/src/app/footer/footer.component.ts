import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';

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
            this.message = "You have successfully subscribed!";
            this.subscriberEmail = ''; // Clear the input field
          },
          error: () => {
            this.message = "Subscription failed. Please try again.";
          }
        });
    }
  }
}