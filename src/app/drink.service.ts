import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { map } from 'rxjs/operators';
import {environment} from '../environments/environment';
import { UserModel } from './user.model';
import { UserAPIResponse } from './response.model';
import {Md5} from 'ts-md5/dist/md5';
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
}
