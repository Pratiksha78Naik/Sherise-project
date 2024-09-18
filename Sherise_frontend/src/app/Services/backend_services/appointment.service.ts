import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URI = "https://sherise-app-latest.onrender.com/"; // Use a string instead of an array

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  postAppointment(appointment: any, p0: unknown): Observable<any> { // Removed the unused 'p0' parameter
    return this.http.post(`${BASIC_URI}/appoint/appointmentuser`, appointment); // Corrected template string usage
  }
}
