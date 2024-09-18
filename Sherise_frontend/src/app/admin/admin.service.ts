import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserStorageService } from '../Services/storage/user-storage.service';

const BASIC_URL = "https://sherise-app-latest.onrender.com/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private userStorageService: UserStorageService) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}admin/users`, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json' as 'json'
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${BASIC_URL}admin/users/${id}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${BASIC_URL}admin/users/${id}`, userData, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}admin/users/${id}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}api/admin/category`, categoryDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(categoryId: any): Observable<void> {
    return this.http.delete<void>(`${BASIC_URL}api/admin/category/${categoryId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAllCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/admin/categories`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }


  addProduct(productDto: any): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}api/admin/product`, productDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(id: number, productDto: any): Observable<any> {
    return this.http.put<any>(`${BASIC_URL}api/admin/product/${id}`, productDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  addCoupon(couponDto: any): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}api/admin/coupons`, couponDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getCoupons(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/admin/coupons`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getPlacedOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/admin/placedOrders`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  changeOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.get(
      `${BASIC_URL}api/admin/order/${orderId}/${status}`,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }


  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/admin/products`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAllProductsByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(productId: any): Observable<void> {
    return this.http.delete<void>(`${BASIC_URL}api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.userStorageService.getToken());
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
