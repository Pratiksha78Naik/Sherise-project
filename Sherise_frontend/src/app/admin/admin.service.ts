import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../Services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService // Inject UserStorageService
  )
   { }

  getAllUsers(): Observable<any> {
    return this.http.get(BASIC_URL + "admin/users");
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "admin/users/" + id);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(BASIC_URL + "admin/users/" + id, userData);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(BASIC_URL + "admin/users/" + userId);
  }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteCategory(categoryId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/category/${categoryId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  

  getAllCategory(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/categories', {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/product', productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateProduct(id: number, productDto: any): Observable<any> {
    return this.http.put(`${BASIC_URL}api/admin/product/${id}`, productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }
  
  
  addCoupon(couponDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/coupons', couponDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCoupons(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/coupons', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/products', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + this.userStorageService.getToken() // Ensure space after 'Bearer'
    );
  }
  
}
