import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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

  private apiUrl = 'http://localhost:8080/regi/registration';

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.submitForm(this.formData).subscribe({
      next: (response: any) => {
        console.log('Form submitted successfully!', response);
        this.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error submitting form!', error);
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
      workshop:''
};
}
}
