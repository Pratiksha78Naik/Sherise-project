import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  timelineEvents = [
    {
      date: 'May, 2020',
      description: 'Registered as a Not for Profit Trust, dedicated to promoting community welfare and social responsibility.',
      icon: 'assets/images/logo-no-background.png'
    },
    {
      date: 'December, 2020',
      description: 'Launched our Facebook Community to spread awareness about menstrual health',
      icon: 'assets/images/about2.jpg'
    },
    {
      date: 'January, 2021',
      description: 'Facebook Community reaches 50K Women Members, raising awareness on menstrual health',
      icon: 'assets/images/about1.jpg'
    },
    {
      date: 'September, 2021',
      description: 'First menstrual health education workshop conducted in rural areas',
      icon: 'assets/images/schoolgirls-1-16660005054x3.jpg'
    },
    {
      date: 'January, 2022',
      description: 'Distributed 1,000 menstrual hygiene kits to underserved communities',
      icon: 'assets/images/events/food.jpg'
    },
    {
      date: 'March, 2023',
      description: 'Partnership established with local schools to integrate menstrual education into their curriculum',
      icon: 'assets/images/events/46094231161_056d7b2cdf_b.jpg'
    },
    {
      date: 'June, 2023',
      description: 'Launched our first online educational campaign on menstrual equity',
      icon: 'assets/images/about3.webp'
    },
    {
      date: 'October, 2023',
      description: 'Trained 50 community leaders as menstrual health advocates',
      icon: 'assets/images/about5.jpg'
    },
    {
      date: 'January, 2024',
      description: 'Held the first Menstrual Health Awareness Week, reaching over 10,000 individuals',
      icon: 'assets/images/about4.webp'
    }
    // Add more events as needed
];
}

