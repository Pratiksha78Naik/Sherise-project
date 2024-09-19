import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';  // Import SweetAlert

@Component({
  selector: 'app-hcamps',
  templateUrl: './hcamps.component.html',
  styleUrls: ['./hcamps.component.css']
})
export class HcampsComponent {
  questionFormData = {
    name: '',
    email: '',
    question: ''  // Field used for question submission
  };

  registrationFormData = {
    name: '',
    email: '',
    workshop: ''
  };

  private questionApiUrl = 'https://sherise-app-latest.onrender.com/questions/submit';
  private registrationApiUrl = 'https://sherise-app-latest.onrender.com/form/form1';

  constructor(private http: HttpClient) { }

  onQuestionSubmit() {
    this.submitQuestionForm(this.questionFormData).subscribe({
      next: (response: any) => {
        // SweetAlert Success Message for Question Submission
        Swal.fire({
          icon: 'success',
          title: 'Question Submitted!',
          text: 'Thank you for submitting your question.',
          confirmButtonText: 'OK'
        });
        this.resetQuestionForm();
      },
      error: (error: HttpErrorResponse) => {
        // SweetAlert Error Message for Question Submission
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to submit your question. Please try again later.',
          confirmButtonText: 'OK'
        });
        console.error('Error submitting question!', error);
      }
    });
  }

  onRegistrationSubmit() {
    this.submitRegistrationForm(this.registrationFormData).subscribe({
      next: (response: any) => {
        // SweetAlert Success Message for Registration Submission
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered for the workshop.',
          confirmButtonText: 'OK'
        });
        this.resetRegistrationForm();
      },
      error: (error: HttpErrorResponse) => {
        // SweetAlert Error Message for Registration Submission
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to register for the workshop. Please try again later.',
          confirmButtonText: 'OK'
        });
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
      workshop: ''
    };
  }
}
