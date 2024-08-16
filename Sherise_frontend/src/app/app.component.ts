import { Component, OnInit } from '@angular/core';
import { UserStorageService } from './Services/storage/user-storage.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sherise_frontend';

  isCustomerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Update login state when the route changes
        this.isCustomerLoggedIn = this.userStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = this.userStorageService.isAdminLoggedIn();
      }
    });
  }

  logout(): void {
    this.userStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
