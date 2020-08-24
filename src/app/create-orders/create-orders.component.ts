import { Component, OnInit } from '@angular/core';
import { DrinkModel } from '../drink.model';
import { DrinkService } from '../drink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-orders',
  templateUrl: './create-orders.component.html',
  styleUrls: ['./create-orders.component.css']
})
export class CreateOrdersComponent implements OnInit {
  public drinksList: DrinkModel[];
  constructor(public drinkService: DrinkService, public router: Router) { }

  ngOnInit() {
    this.drinkService.listDrinks().subscribe((drinksReturned) => {
      if (drinksReturned) {
        this.drinksList = drinksReturned.results;
       }
    });
  }

  addToOrder(drinkId){
    console.log(drinkId);
  }

}
