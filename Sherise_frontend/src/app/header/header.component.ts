// header.component.ts
import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../Services/storage/user-storage.service'; // Update with your actual path
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCustomerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  showHeader: boolean = false;
 

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

        this.showHeader = !(event.url === '/login' || event.url === '/signup');

      }
    });
  }

  logout(): void {
    this.userStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
