import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

export interface LoginResponse {
  token: string;
  user: {
    username: string;
  };
}



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





login(username: string, password: string): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const body = { username, password };

  return this.http.post<any>(BASIC_URL + 'authenticate', body, { headers, observe: 'response' }).pipe(
    map((res) => {
      const token = res.headers.get('authorization')?.substring(7);  // Extracting the token
      const user = res.body;  // Assuming the user data is in the response body
      if (token && user) {
        this.userStorageService.saveToken(token);
        this.userStorageService.saveUser(user);
        return { token, user };  // Returning an object with token and user
      }
      return { token: null, user: null };  // Return an object even if authentication fails
    })
  );
}





  isLoggedIn(): boolean {
    // Implement logic to check if the user is logged in
    return !!localStorage.getItem('token'); // Example using localStorage
  }
}
