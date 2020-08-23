import { Component, OnInit } from '@angular/core';
import { DrinkModel } from '../drink.model';
import { DrinkService } from '../drink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-drinks',
  templateUrl: './list-drinks.component.html',
  styleUrls: ['./list-drinks.component.css']
})
export class ListDrinksComponent implements OnInit {
  public drinksList: DrinkModel[];
  constructor(public drinkService: DrinkService, public router: Router) { }

  ngOnInit() {
    this.drinkService.listDrinks().subscribe((drinksReturned) => {
      if (drinksReturned) {
        this.drinksList = drinksReturned.results;
       }
    });
  }

  getDrinksByPrice(priceOrder) {
    this.drinkService.listDrinksByPrice(priceOrder).subscribe((drinksReturned) => {
      if (drinksReturned) {
        this.drinksList = drinksReturned.results;
       }
    });
  }

  getDrinkByKeyword(keyword) {
    this.drinkService.listDrinksByKeyword(keyword).subscribe((drinksReturned) => {
      if (drinksReturned) {
        this.drinksList = drinksReturned.results;
       }
    });
  }

}
