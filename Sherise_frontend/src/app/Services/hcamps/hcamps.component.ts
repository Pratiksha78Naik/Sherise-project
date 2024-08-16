import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-hcamps',
  templateUrl: './hcamps.component.html',
  styleUrls: ['./hcamps.component.css']
})
export class HcampsComponent {
  questionFormData = {
    name: '',
    email: '',
    question: ''  // This is the field used in the question submission form
  };

  registrationFormData = {
    name: '',
    email: '',
    workshop: ''
  };

  private questionApiUrl = 'http://localhost:8080/questions/submit';
  private registrationApiUrl = 'http://localhost:8080/form/form1';

  constructor(private http: HttpClient) { }

  onQuestionSubmit() {
    this.submitQuestionForm(this.questionFormData).subscribe({
      next: (response: any) => {
        console.log('Question submitted successfully!', response);
        this.resetQuestionForm();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error submitting question!', error);
      }
    });
  }

  onRegistrationSubmit() {
    this.submitRegistrationForm(this.registrationFormData).subscribe({
      next: (response: any) => {
        console.log('Registration submitted successfully!', response);
        this.resetRegistrationForm();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error submitting registration!', error);
      }
    });
  }

  submitQuestionForm(formData: any): Observable<any> {
    return this.http.post(this.questionApiUrl, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error in question submission:', error.message);
        return throwError(() => new Error('Error in question submission'));
      })
    );
  }

  submitRegistrationForm(formData: any): Observable<any> {
    return this.http.post(this.registrationApiUrl, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error in registration submission:', error.message);
        return throwError(() => new Error('Error in registration submission'));
      })
    );
  }

  resetQuestionForm() {
    this.questionFormData = {
      name: '',
      email: '',
      question: ''
    };
  }

  resetRegistrationForm() {
    this.registrationFormData = {
      name: '',
      email: '',
      workshop:''
};
}
}
