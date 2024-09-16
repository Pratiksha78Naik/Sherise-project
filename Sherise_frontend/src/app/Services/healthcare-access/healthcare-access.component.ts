import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../backend_services/appointment.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private router: Router  // Injected Router
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
          // Success SweetAlert notification
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Appointment booked successfully!',
            confirmButtonText: 'OK'
          }).then(() => {
            location.reload();  // Reload the page after success
          });
        },
        (err) => {
          // Error SweetAlert notification
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Appointment booking failed. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
