import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../backend_services/appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-healthcare-access',
  templateUrl: './healthcare-access.component.html',
  styleUrl: './healthcare-access.component.css'
})
export class HealthcareAccessComponent {

  postAppointmentForm!: FormGroup;

  constructor(
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,  // Injected MatSnackBar
    private router: Router           // Injected Router
  ) {}

  ngOnInit() {
    this.postAppointmentForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      date: [null, Validators.required]
    });
  }

  postAppointment() {
    if (this.postAppointmentForm.valid) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer YOUR_TOKEN_HERE');
      this.appointmentService.postAppointment(this.postAppointmentForm.value, { headers }).subscribe(
        (res) => {
          this.snackBar.open('Appointment booked successfully!', 'Close', { duration: 5000 });
          location.reload();
        },
        (err) => {
          this.snackBar.open('Appointment booking failed. Please try again.', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
