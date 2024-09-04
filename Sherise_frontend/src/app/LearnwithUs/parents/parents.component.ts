import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent {
  formData = {
    email: '',
    question: ''
  };

  private apiUrl = 'http://localhost:8080/parent-queries';

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
