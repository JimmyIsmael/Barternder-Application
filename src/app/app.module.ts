import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateUsersComponent } from './create-users/create-users.component';
import { routingModule } from './app.routing';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { LoginComponent } from './login/login.component';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './_guards/index';
import { ListDrinksComponent } from './list-drinks/list-drinks.component';
import { CreateDrinksComponent } from './create-drinks/create-drinks.component';
import { CreateOrdersComponent } from './create-orders/create-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    CreateUsersComponent,
    HomeComponent,
    ListUsersComponent,
    HelloWorldComponent,
    LoginComponent,
    ListDrinksComponent,
    CreateDrinksComponent,
    CreateOrdersComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    routingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
