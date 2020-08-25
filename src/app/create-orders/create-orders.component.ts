import { Component, OnInit } from '@angular/core';
import { DrinkModel } from '../drink.model';
import { DrinkService } from '../drink.service';
import { Router } from '@angular/router';
import { OrderItemModel } from '../order-item.model';
import { OrderModel } from '../order.model';
import { DatePipe } from '@angular/common';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-create-orders',
  templateUrl: './create-orders.component.html',
  styleUrls: ['./create-orders.component.css']
})
export class CreateOrdersComponent implements OnInit {
  public drinksList: DrinkModel[];
  public orderItemsList:  any = [];
  drink: DrinkModel;
  total = 0;
  constructor(public drinkService: DrinkService, public router: Router, public datepipe: DatePipe, public orderService: OrderService) { }

  ngOnInit() {
    this.drinkService.listDrinks().subscribe((drinksReturned) => {
      if (drinksReturned) {
        this.drinksList = drinksReturned.results;
       }
    });
  }

  addToOrder(drinkId) {
    this.drinkService.getDrink(drinkId).subscribe((drinksReturned) => {
      // tslint:disable-next-line: triple-equals
      if (drinksReturned != undefined) {
        this.drink = drinksReturned.results[0];

        const orderItem:  OrderItemModel = {
          id: null,
          drinkId: this.drink.id,
          drinkName: this.drink.name,
          price: this.drink.price,
          quantity: 1
        };

        this.total = this.drink.price + this.total;
        this.orderItemsList.push(orderItem);
      }
    });
  }

  deleteFromOrder(drinkId) {
    const removeIndex = this.orderItemsList.map(function(drink) { return drink.drinkId; }).indexOf(drinkId);
    this.orderItemsList.splice(removeIndex, 1);
  }

  saveOrder() {
    if (typeof this.orderItemsList !== 'undefined' && this.orderItemsList.length > 0) {
      const order: OrderModel = {
        id: null,
        userId: JSON.parse(localStorage.getItem('currentUser')).id,
        userName: JSON.parse(localStorage.getItem('currentUser')).first_name + ' ' +
          JSON.parse(localStorage.getItem('currentUser')).last_name,
        orderDate: this.datepipe.transform(new Date(), 'yyyy/MM/dd'),
        orderStatus: 'Submitted',
        orderItems: this.orderItemsList
      };

      console.log(order);

      this.orderService.saveOrder(order).subscribe((orderCreated) => {
        if (orderCreated) {
          this.router.navigate(['/list-orders']);
        }
      });
    } else {
      alert('Select at least one drink for the order');
    }
  }
}
