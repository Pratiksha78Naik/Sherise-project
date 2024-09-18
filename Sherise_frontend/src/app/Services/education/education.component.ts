import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    workshop: ''
  };

  private apiUrl = 'https://sherise-app-latest.onrender.com/registration';

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.submitForm(this.formData).subscribe({
      next: (response: any) => {
        console.log('Form submitted successfully!', response);
        this.resetForm();

        // Success SweetAlert notification
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Form submitted successfully!',
          confirmButtonText: 'OK'
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error submitting form!', error);

        // Error SweetAlert notification
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to submit the form. Please try again!',
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
      name: '',
      email: '',
      phone: '',
      workshop: ''
    };
  }
}
