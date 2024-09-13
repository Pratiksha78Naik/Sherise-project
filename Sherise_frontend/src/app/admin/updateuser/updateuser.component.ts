import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service'; // Adjust the path as needed
import Swal from 'sweetalert2'; // Using SweetAlert for better user experience

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  userId!: number;
  user: any = {}; // Define a proper user model if available

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;
      this.getUserById(this.userId);
    });
  }

  getUserById(id: number): void {
    this.adminService.getUserById(id).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('Error fetching user data:', error);
        Swal.fire('Error', 'Could not fetch user details. Please try again later.', 'error');
      }
    );
  }

  updateUser(): void {
    this.adminService.updateUser(this.userId, this.user).subscribe(
      () => {
        Swal.fire('Success', 'User updated successfully.', 'success').then(() => {
          this.router.navigate(['/admin/user']); // Redirect after successful update
        });
      },
      error => {
        console.error('Error updating user:', error);
        Swal.fire('Error', 'Could not update user. Please try again later.', 'error');
      }
    );
  }
}
