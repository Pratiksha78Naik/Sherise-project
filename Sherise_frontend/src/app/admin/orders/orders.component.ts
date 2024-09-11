import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPlacedOrders();
  }

  getPlacedOrders(): void {
    this.adminService.getPlacedOrders().subscribe(res => {
      this.orders = res;
    });
  }

  changeOrderStatus(orderId: number, status: string) {
    this.adminService.changeOrderStatus(orderId, status).subscribe(
      (res) => {
        if (res && res.id) { // Check if the response is valid
          this.snackBar.open("Order Status changed successfully", "Close", { duration: 5000 });
          this.getPlacedOrders(); // Refresh the orders list
        } else {
          this.snackBar.open("Something went wrong", "Close", { duration: 5000 });
        }
      },
      (err) => {
        this.snackBar.open("An error occurred: " + err.message, "Close", { duration: 5000 });
      }
    );
  }
  
}
