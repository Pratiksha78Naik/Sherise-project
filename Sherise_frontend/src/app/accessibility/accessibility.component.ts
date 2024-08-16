import { Component, OnInit } from '@angular/core';
import { AccessibilityService } from '../accessibility.service';

@Component({
  selector: 'app-accessibility',
  template: `
    <div *ngIf="showAccessibilityFeature">
      <!-- Your accessibility feature content here -->
      <p>Accessibility feature activated!</p>
    </div>
  `,
  styleUrls: ['./accessibility.component.css'],
})
export class AccessibilityComponent implements OnInit {
  showAccessibilityFeature = false;

  constructor(private accessibilityService: AccessibilityService) {}

  ngOnInit() {
    this.accessibilityService.trigger$.subscribe(() => {
      this.showAccessibilityFeature = !this.showAccessibilityFeature;
    });
  }
}
