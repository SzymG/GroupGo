import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../user-service/user.service';

@Injectable({
    providedIn: 'root'
})
export class GuestGuardService implements CanActivate {

    constructor(
        private readonly userService: UserService,
        private readonly router: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve) => {
            this.userService.isFirebaseAuthenticated().then((user) => {
                if (!!user) {
                    this.router.navigate(['profile'], {skipLocationChange: true});
                }
                resolve(!(!!user));
            });
        });
    }
}
