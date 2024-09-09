import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
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
  
    return this.http.post(`${BASIC_URL}api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader(),
      observe: 'response', // Get the full HTTP response
      responseType: 'text' // Handle response as plain text if JSON is not expected
    }).pipe(
      tap((response: HttpResponse<string>) => {
        if (response.status === 201) {
          console.log('Product added to cart successfully');
          this.showSnackbar('Product added to cart successfully');
        } else {
          console.log('Unexpected status code:', response.status);
          this.showSnackbar('Unexpected status code: ' + response.status);
        }
      }),
      catchError(this.handleError)
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

  applyCoupon(code: any): Observable<any> {
    const userId = this.userStorageService.getUserId();

    if (!userId) {
      console.error('User ID is not available.');
      return throwError(() => new Error('User ID is missing'));
    }

    return this.http.get<any>(`${BASIC_URL}api/customer/coupon/${userId}/${code}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  placeOrder(orderDto: any): Observable<any> {
    const userId = this.userStorageService.getUserId();

    if (!userId) {
      console.error('User ID is not available.');
      return throwError(() => new Error('User ID is missing'));
    }

    orderDto.userId = userId;

    return this.http.post<any>(`${BASIC_URL}api/customer/placeOrder`, orderDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAllCategory(): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/admin/categories`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message || 'No error message'}`;
    }
    
    console.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }

  private showSnackbar(message: string): void {
    // Implement the snackbar logic here
    console.log(message);
  }
}
