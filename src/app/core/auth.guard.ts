import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { AuthService } from './services/auth.service'
import { UserService } from './services/user.service'
import { LoggingService } from './services/logging.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private name: string = 'AuthGuard'

  constructor(private router: Router, private authService: AuthService, private userservice: UserService, private loggingservice: LoggingService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let operation: string = 'canActivate'
    this.loggingservice.trace(this.name, operation)
    const currentUser = this.userservice.loggedInUserValue
    if (currentUser) {
      this.loggingservice.debug('Current User', this.name, operation, { currentUser })
      // check if route is restricted by role
      let userRoleIds = currentUser['Roles'].data.map(x => x.name)

      if (route.data.roles && route.data.roles.some(role => userRoleIds.includes(role))) {
        this.loggingservice.debug('Authorized', this.name, operation)
        // authorised so return true
        return true
      }
      this.loggingservice.debug('not authorised', this.name, operation)
      // role not authorised so redirect to home page
      this.router.navigate(['/auth/login'])
      return false
    }

    this.loggingservice.debug('No Current User', this.name, operation)
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } })
    return false
  }
}
