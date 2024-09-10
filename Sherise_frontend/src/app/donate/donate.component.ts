import { Component } from '@angular/core';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent {
  pay() {
    // Just a simple action on click
    alert('Thank you for your donation!');
  }
}