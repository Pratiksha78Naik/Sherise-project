import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN = 'cart-token';
const USER = 'cart-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public saveToken(token: string): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  public saveUser(user: any): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  public getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(TOKEN);
    }
    return null;
  }

  public getUser(): any {
    if (this.isBrowser()) {
      return JSON.parse(localStorage.getItem(USER) || 'null');
    }
    return null;
  }

 
  public getUserId(): string {
    const user = this.getUser();
    return user ? user.UserId : ''; // Use UserId with capital "U"
  }

  public getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  public isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role = this.getUserRole();
    return role === 'ADMIN';
  }

  public isCustomerLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role = this.getUserRole();
    return role === 'CUSTOMER';
  }


  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public signOut(): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}
