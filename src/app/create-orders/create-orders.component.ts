import { Component, OnInit } from '@angular/core';
import { DrinkModel } from '../drink.model';
import { DrinkService } from '../drink.service';
import { Router } from '@angular/router';
import { OrderItemModel } from '../order.model';

@Component({
  selector: 'app-create-orders',
  templateUrl: './create-orders.component.html',
  styleUrls: ['./create-orders.component.css']
})
export class CreateOrdersComponent implements OnInit {
  public drinksList: DrinkModel[];
  public orderList:  any = [];
  drink: DrinkModel;
  total = 0;
  constructor(public drinkService: DrinkService, public router: Router) { }

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
        console.log(this.drink.price);
        this.orderList.push(orderItem);
      }
    });
  }

  deleteFromOrder(drinkId) {
    var removeIndex = this.orderList.map(function(drink) { return drink.drinkId; }).indexOf(drinkId);
    this.orderList.splice(removeIndex, 1);
  }
}
