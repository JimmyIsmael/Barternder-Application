import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: 'app-navbar.component.html',
  styles: []
})
export class AppNavbarComponent implements OnInit {
  private userModel: UserModel;
  username: string;
  constructor() { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('currentUser')).first_name + ' ' +
      JSON.parse(localStorage.getItem('currentUser')).last_name;
  }
}
