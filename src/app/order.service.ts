import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import {environment} from '../environments/environment';
import { OrderModel } from './order.model';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private serverAddress = environment.backendURL;
  constructor(private httpClient: HttpClient, private router: Router, private http: Http) {}

  saveOrder(order: OrderModel) {
    return this.httpClient.post<{drinkCreated: boolean}>(this.serverAddress + 'api/order/new', order);
  }
}
