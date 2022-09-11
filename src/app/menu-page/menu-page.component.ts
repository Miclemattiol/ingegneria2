import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; 
import { employee } from 'src/assets/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  constructor(public userService: UserService, public router: Router) { }

  logout(): void {
    this.userService.logout();
  }

  menuItems = [
    {name: 'Registra utente', link: '/register', supported: false},
    {name: 'Cerca libro', link: '/books', supported: true},
    {name: 'Dettagli utente', link: '/users', supported: false},
    {name: 'Noleggio libro', link: '/rent', supported: false},
    {name: 'Consegna libro', link: '/return', supported: false},
  ]

  ngOnInit(): void {
  }

}
