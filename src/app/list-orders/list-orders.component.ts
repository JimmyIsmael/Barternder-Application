import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderModel } from '../order.model';
import { OrderItemModel } from '../order-item.model';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  orderList: OrderModel[];
  itemList: OrderItemModel[];
  public showModalBox = false;
  display: string;
  public orderNumber: number;
  constructor(public orderService: OrderService) { }

  ngOnInit() {
    this.orderService.listOrders().subscribe((ordersReturned) => {
      if (ordersReturned) {
        this.orderList = ordersReturned.results;
       }
    });
  }

  viewOrder(orderId){
    this.orderService.listOrderItems(orderId).subscribe((itemsReturned) => {
      if (itemsReturned) {
        this.itemList = itemsReturned.results;
        this.showModalBox = true;
        this.display = 'block';
        this.orderNumber = orderId;
       }
    });
  }

  closeOrder(orderId) {
    this.display = 'none';
    this.orderService.closeOrder(orderId).subscribe((orderClosed) => {
      if (orderClosed) {
        this.display = 'none';
        this.ngOnInit();
       }
    });
  }

}
