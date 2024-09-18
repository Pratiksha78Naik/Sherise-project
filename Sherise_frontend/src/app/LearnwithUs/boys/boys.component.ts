import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-boys',
  templateUrl: './boys.component.html',
  styleUrls: ['./boys.component.css']  // Fixed typo (styleUrl => styleUrls)
})
export class BoysComponent {
  formData = {
    email: '',
    question: ''
  };

  private apiUrl = 'https://sherise-app-latest.onrender.com/boys-queries';

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.submitForm(this.formData).subscribe({
      next: (response: any) => {
        console.log('Query submitted successfully!', response);
        Swal.fire({
          icon: 'success',
          title: 'Submitted!',
          text: 'Your query has been submitted successfully!',
          confirmButtonText: 'OK'
        });
        this.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error submitting query!', error);
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed!',
          text: 'There was an error submitting your query. Please try again.',
          confirmButtonText: 'OK'
        });
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
