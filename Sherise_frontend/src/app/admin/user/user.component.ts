import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2'; // Using SweetAlert for better user experience

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = []; // Use any[] to match your service response type

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (res: any[]) => { // Adjust the type to any[] if no specific model is used
        this.users = res;
      },
      (error: any) => {
        Swal.fire('Error', 'Could not fetch users. Please try again later.', 'error');
      }
    );
  }

  deleteUser(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(id).subscribe(
          () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.users = this.users.filter(user => user.id !== id);
          },
          (error: any) => {
            Swal.fire('Error', 'User could not be deleted.', 'error');
          }
        );
      }
    });
  }

  updateUser(id: number, updatedData: any): void { // Use any for updatedData
    this.adminService.updateUser(id, updatedData).subscribe(
      () => {
        Swal.fire('Updated!', 'User has been updated successfully.', 'success');
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...updatedData }; // Update the local array
        }
      },
      (error: any) => {
        Swal.fire('Error', 'User could not be updated.', 'error');
      }
    );
  }
}
