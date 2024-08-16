
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-kagajpad',
  templateUrl: './kagajpad.component.html',
  styleUrl: './kagajpad.component.css'
})
export class KagajpadComponent {
  videos: SafeResourceUrl[];

  constructor(private sanitizer: DomSanitizer) {
    this.videos = [
      this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/X3IyuiwsbJ0?si=MRysC6Vr0XXv8azs4Qn6kA'), // Replace VIDEO_ID1 with actual video ID
      this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/igEgGWKfeKI?si=QF1ZDF0qDrR28wN3'), // Replace VIDEO_ID2 with actual video ID
    ];
  }
}