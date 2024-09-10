import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  myOrders: any;

  // Define the status mapping with an index signature
  statusMapper: { [key: string]: string } = {
    'Placed': 'label-primary',
    'Shipped': 'label-info',
    'Delivered': 'label-success',
    'Cancelled': 'label-danger'
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders(): void {
    this.customerService.getOrdersByUserId().subscribe({
      next: (res) => {
        this.myOrders = res;
      },
      error: (err) => {
        console.error('Failed to load orders:', err);
      }
    });
  }

  getStatusClass(status: string): string {
    return this.statusMapper[status] || 'label-default';
  }
}
