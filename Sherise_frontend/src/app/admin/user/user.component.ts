import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (res: any) => {
        console.log('Users fetched successfully:', res);
        this.users = res;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(id: number): void {
    console.log('Deleting user with ID:', id);
    this.adminService.deleteUser(id).subscribe(
      (res: any) => {
        console.log('User deleted successfully:', res);
        // Refresh the user list after deletion
        this.getAllUsers();
      },
      (error: any) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  updateUser(id: number, updatedData: any): void {
    this.adminService.updateUser(id, updatedData).subscribe(
      (res) => {
        console.log('User updated successfully:', res);
        // Optionally, refresh the user list or handle UI updates
        this.getAllUsers();
      },
      (error: any) => {
        console.error('Error updating user:', error);
      }
    );
  }

}
