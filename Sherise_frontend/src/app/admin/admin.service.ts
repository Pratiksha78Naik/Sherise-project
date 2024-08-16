import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

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
}
