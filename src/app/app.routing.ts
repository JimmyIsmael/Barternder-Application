import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CreateUsersComponent } from './create-users/create-users.component';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/index';
import { ListDrinksComponent } from './list-drinks/list-drinks.component';
import { CreateDrinksComponent } from './create-drinks/create-drinks.component';

const routes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'create-user', component: CreateUsersComponent, canActivate: [AuthGuard] },
  { path: 'list-users', component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'list-drinks', component: ListDrinksComponent, canActivate: [AuthGuard] },
  { path: 'create-drink', component: CreateDrinksComponent, canActivate: [AuthGuard] },
  { path: 'hello-world', component: HelloWorldComponent }
];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
