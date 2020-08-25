import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import {environment} from '../environments/environment';
import { OrderModel } from './order.model';
import { DrinkAPIResponse } from './drink-response.model';
import { OrderAPIResponse } from './order-response.model';
import { ItemsAPIResponse } from './items-response.model';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private serverAddress = environment.backendURL;
  constructor(private httpClient: HttpClient, private router: Router, private http: Http) {}

  saveOrder(order: OrderModel) {
    return this.httpClient.post<{drinkCreated: boolean}>(this.serverAddress + 'api/order/new', order);
  }

  listOrders() {
    return this.httpClient.get<OrderAPIResponse>(this.serverAddress + 'api/order/status/submitted');
  }

  listOrderItems(orderId) {
    return this.httpClient.get<ItemsAPIResponse>(this.serverAddress + 'api/order/item/' + orderId);
  }

  closeOrder(orderId) {
    return this.httpClient.get<{orderClosed: boolean}>(this.serverAddress + 'api/order/close/' + orderId);
  }
}
