import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiresLogin = route.data? (route.data as any).requiresLogin : false;
    const logged = this.userService.isLoggedIn();
    if(requiresLogin == logged) {
      return true;
    }else{
      if(requiresLogin) {
        this.router.navigate(['/login']);
      }else{
        this.router.navigate(['/menu']);
      }
      return false;
    }
  }

  constructor(private userService: UserService, private router: Router) { }
}
