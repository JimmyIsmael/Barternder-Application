import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserModel } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  public usersList: UserModel[];
  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit() {
    this.userService.listUsers().subscribe((usersReturned) => {
      if (usersReturned) {
        this.usersList = usersReturned.results;
       }
    });
  }

  getVolunteersByStatus(status) {
    // tslint:disable-next-line: triple-equals
    if (status != 'All Users') {
      this.usersList = [];
      this.userService.listVolunteerByStatus(status).subscribe((usersReturned) => {
        if (usersReturned) {
          this.usersList = usersReturned.results;
        }
      });
    } else {
      this.usersList = [];
      this.userService.listUsers().subscribe((usersReturned) => {
        if (usersReturned) {
          this.usersList = usersReturned.results;
        }
      });
    }
  }

  findUser(searchValue) {
    if (searchValue === '') {
      this.userService.listUsers().subscribe((usersReturned) => {
        if (usersReturned) {
          this.usersList = usersReturned.results;
        }
      });
    } else {
      this.userService.getAllVolunteersBySearchValue(searchValue).subscribe((usersReturned) => {
        if (usersReturned) {
          this.usersList = usersReturned.results;
        }
      });
    }
  }
}
