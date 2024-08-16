import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccessibilityService {
  private triggerSubject = new Subject<void>();
  trigger$ = this.triggerSubject.asObservable();

  triggerAccessibilityFeature() {
    this.triggerSubject.next();
  }
}
