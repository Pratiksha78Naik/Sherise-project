import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) {}

  register(signupRequest: any): Observable<any> {
    return this.http.post<any>(BASIC_URL + "sign-up", signupRequest);
  }

  login(username: string, password: string): Observable<{ token: string; user: any }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };

    return this.http.post<{ token: string; user: any }>(BASIC_URL + 'authenticate', body, { headers, observe: 'response' }).pipe(
      map((res) => {
        const token = res.headers.get('authorization')?.substring(7) || '';
        const user = res.body;
        console.log('Login response user:', user); // Debugging line
        return { token, user };
      })
    );
  }
}
