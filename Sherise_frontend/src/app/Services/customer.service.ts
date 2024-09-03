import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { UserStorageService } from './storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  isLoggedIn(): boolean {
    const token = this.userStorageService.getToken();
    return !!token; // Return true if token exists
  }


  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/customer/products`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAllProductsByName(name: string): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/customer/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  addToCart(productId: number): Observable<any> {
    const userId = this.userStorageService.getUserId();
    const cartDto = {
      productId: productId,
      userId: userId
    };

    if (!userId) {
      console.error('User ID is not available.');
      return throwError(() => new Error('User ID is missing'));
    }

    return this.http.post<any>(`${BASIC_URL}api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap(response => {
        // Log the successful response for debugging
        console.log('Add to cart response:', response);
        // Handle any additional success actions here
      }),
      catchError(error => {
        // Log the error for debugging
        console.error('Error in addToCart:', error);
        // Return a user-friendly error message
        return throwError(() => new Error('Failed to add product to cart.'));
      })
    );
  }

  increaseProductQuantity(productId: number): Observable<any> {
    const userId = this.userStorageService.getUserId();
    const cartDto = {
      productId: productId,
      userId: userId
    };

    if (!userId) {
      console.error('User ID is not available.');
      return throwError(() => new Error('User ID is missing'));
    }

    return this.http.post<any>(`${BASIC_URL}api/customer/addition`, cartDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  decreaseProductQuantity(productId: number): Observable<any> {
    const userId = this.userStorageService.getUserId();
    const cartDto = {
      productId: productId,
      userId: userId
    };

    if (!userId) {
      console.error('User ID is not available.');
      return throwError(() => new Error('User ID is missing'));
    }

    return this.http.post<any>(`${BASIC_URL}api/customer/deduction`, cartDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteProductFromCart(productId: number): Observable<any> {
    const userId = this.userStorageService.getUserId();
    const cartDto = {
      productId: productId,
      userId: userId
    };
  
    if (!userId) {
      console.error('User ID is not available.');
      return throwError(() => new Error('User ID is missing'));
    }
  
    return this.http.post<any>(`${BASIC_URL}api/customer/delete`, cartDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }
  

  getCartByUserId(): Observable<any> {
    const userId = this.userStorageService.getUserId();
  
    if (!userId) {
      console.error('User ID is not available.');
      return throwError(() => new Error('User ID is missing'));
    }
  
    return this.http.get<any>(`${BASIC_URL}api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  applyCoupon(code:any): Observable<any> {
    const userId = this.userStorageService.getUserId();
  
    if (!userId) {
      console.error('User ID is not available.');
      return throwError(() => new Error('User ID is missing'));
    }
  
    return this.http.get<any>(`${BASIC_URL}api/customer/cart/${userId}/${code}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  placeOrder(orderDto: any): Observable<any> {
    const userId = this.userStorageService.getUserId(); // Get the userId from the service
    
    if (!userId) {
      console.error('User ID is not available.');
      return throwError(() => new Error('User ID is missing'));
    }
  
    orderDto.userId = userId; // Assign the userId to orderDto
  
    return this.http.post<any>(`${BASIC_URL}api/customer/placeOrder`, orderDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }
  

  getAllCategory(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/categories', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/admin/category/${categoryId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.userStorageService.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      console.error('No token found, unable to set Authorization header');
      return new HttpHeaders();
    }
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.message || 'No error message'}`;
    }
    
    console.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
