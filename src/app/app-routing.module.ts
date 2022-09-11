import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { AccessGuard } from './access.guard';
import { BooksPageComponent } from './books-page/books-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent, data: {requiresLogin: false}, canActivate: [AccessGuard] },
  { path: 'menu', component: MenuPageComponent, data: {requiresLogin: true}, canActivate: [AccessGuard] },
  { path: 'books', component: BooksPageComponent,  data: {requiresLogin: true}, canActivate: [AccessGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
