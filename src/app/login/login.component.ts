import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { NgForm } from '@angular/forms';
import { UserModel } from '../user.model';
import { UserAPIResponse } from '../response.model';
import { Router, ActivatedRoute } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private userModel: UserModel;
  private apiResponse: UserAPIResponse;
  private endSession: boolean;
  noLoginValuesAlert: boolean;
  incorrectUserAlert: boolean;
  logoutAlert: boolean;

  constructor(public authService: AuthService, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params => {
      this.endSession = params['endSession'];
    });
    if (this.endSession) {
      this.logoutAlert = true;
      localStorage.removeItem('currentUser');
    }
  }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if ( form.invalid ) { // Validating form has data
      this.noLoginValuesAlert = true;
      this.incorrectUserAlert = false;
      this.logoutAlert = false;
      return;
    }
    const user: any = {
      userName: form.value.userName,
      password: form.value.password
    };
    this.authService.getUser(user.userName, user.password).subscribe((userReturned) => {
      if (userReturned) {
        this.userModel = userReturned.results[0];
        localStorage.setItem('currentUser', JSON.stringify(this.userModel));
        this.router.navigate(['/home']);
      } else {
        this.incorrectUserAlert = true;
        this.logoutAlert = false;
        this.noLoginValuesAlert = false;
      }
    });
  }
}
