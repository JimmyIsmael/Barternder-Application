import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import {environment} from '../environments/environment';
import { DrinkAPIResponse } from './drink-response.model';
import { DrinkModel } from './drink.model';

@Injectable({
  providedIn: 'root'
})

export class DrinkService {
  private serverAddress = environment.backendURL;
  constructor(private httpClient: HttpClient, private router: Router, private http: Http) {}

  saveDrink(drink: DrinkModel) {
    return this.httpClient.post<{drinkCreated: boolean}>(this.serverAddress + 'api/drink/new', drink);
  }

  editDrink(drink: DrinkModel) {
    return this.httpClient.post<{drinkCreated: boolean}>(this.serverAddress + 'api/drink/edit', drink);
  }

  getDrink(drinkId) {
    return this.httpClient.get<DrinkAPIResponse>(this.serverAddress + 'api/drink/' + drinkId);
  }

  listDrinks() {
    return this.httpClient.get<DrinkAPIResponse>(this.serverAddress + 'api/drink/');
  }

  listDrinksByPrice(priceOrder) {
    console.log(priceOrder);
    if (priceOrder === '1') {
      return this.httpClient.get<DrinkAPIResponse>(this.serverAddress + 'api/drink/price/lower');
    }
    if (priceOrder === '2') {
      return this.httpClient.get<DrinkAPIResponse>(this.serverAddress + 'api/drink/price/higher');
    } else {
      return this.httpClient.get<DrinkAPIResponse>(this.serverAddress + 'api/drink/');
    }
  }

  listDrinksByKeyword(keyword) {
    return this.httpClient.get<DrinkAPIResponse>(this.serverAddress + 'api/drink/keyword/' + keyword);
  }
}
