import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserStorageService } from './Services/storage/user-storage.service'; // Make sure to import the correct service
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userStorageService: UserStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRole = route.data['role'] as string;

    if (this.userStorageService.isLoggedIn()) {
      const userRole = this.userStorageService.getUserRole();
      if (!requiredRole || requiredRole === userRole) {
        return true;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'You do not have the required permissions to access this page.',
        });
        this.router.navigate(['/']);
        return false;
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Unauthorized',
        text: 'You need to login first!',
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
}
