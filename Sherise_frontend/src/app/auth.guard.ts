import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserStorageService } from './Services/storage/user-storage.service'; // Correct service import
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
        // SweetAlert2 for permission denied
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'You do not have the required permissions to access this page.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/']);
        });
        return false;
      }
    } else {
      // SweetAlert2 for login required
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You need to login first!',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return false;
    }
  }
}
