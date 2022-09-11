import { Component, OnInit } from '@angular/core';
import { credentials } from 'src/assets/types';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  credentials: credentials = {email: '', password: ''};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login(this.credentials);
  }

}
