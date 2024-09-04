import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Component({
  selector: 'app-boys',
  templateUrl: './boys.component.html',
  styleUrl: './boys.component.css'
})
export class BoysComponent {
  formData = {
    email: '',
    question: ''
  };

  private apiUrl = 'http://localhost:8080/boys-queries';

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.submitForm(this.formData).subscribe({
      next: (response: any) => {
        console.log('Query submitted successfully!', response);
        this.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error submitting query!', error);
      }
    });
  }

  submitForm(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error in submission:', error.message);
        return throwError(() => new Error('Error in submission'));
      })
    );
  }

  resetForm() {
    this.formData = {
      email: '',
      question: ''
    };
  }
}
