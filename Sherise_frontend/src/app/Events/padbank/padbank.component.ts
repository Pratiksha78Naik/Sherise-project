
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-padbank',
  templateUrl: './padbank.component.html',
  styleUrls: ['./padbank.component.css']
})
export class PadbankComponent {
  videos: SafeResourceUrl[];

  constructor(private sanitizer: DomSanitizer) {
    this.videos = [
      this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/ULGv4ch18ss?si=jJIueubNm6UjpcuE'), // Replace VIDEO_ID1 with actual video ID
      this.sanitizer.bypassSecurityTrustResourceUrl('//www.youtube.com/embed/mGAPlT-xwJE?si=jOWabtUQ6W-Bjovl'), // Replace VIDEO_ID2 with actual video ID
    ];
  }
}