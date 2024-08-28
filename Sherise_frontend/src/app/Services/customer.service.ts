import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
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

  // addToCart(productId: number): Observable<any> {
  //   const userId = this.userStorageService.getUserId();
  //   const cartDto = {
  //     productId: productId,
  //     userId: userId
  //   };

  //   if (!userId) {
  //     console.error('User ID is not available.');
  //     return throwError(() => new Error('User ID is missing'));
  //   }

  //   return this.http.post<any>(`${BASIC_URL}api/customer/cart`, cartDto, {
  //     headers: this.createAuthorizationHeader(),
  //   }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

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
