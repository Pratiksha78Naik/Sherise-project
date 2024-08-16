import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service'; // Adjust the path as needed

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  userId!: number;
  user: any = {}; // Define user model or interface

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
      }
    );
  }

  updateUser(): void {
    this.adminService.updateUser(this.userId, this.user).subscribe(
      () => {
        this.router.navigate(['/admin/user']); // Redirect after successful update
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }
}
