import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { credentials, employee } from 'src/assets/types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: employee | undefined = undefined;
  accessToken: string = '';

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  login(credentials: credentials): void {
    console.log('login');
    console.table(credentials);
    this.HttpClient.post('http://localhost:3000/api/employeeLogin', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe((response: any) => {
      console.table(response);
      this.user = {
        employeeId: response.id,
        email: response.email,
        password: '',
        name: response.name,
        surname: response.surname,
        level: response.level
      }
      this.router.navigateByUrl('/menu');
    });
  }

  logout(): void{
    this.user = undefined;
    this.router.navigateByUrl('/login');
  }

  constructor(private HttpClient: HttpClient, private router: Router) { 

  }
}
