import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service'
import { Vars } from '../../vars'

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuLayoutComponent implements OnDestroy {
  mobileQuery: MediaQueryList

  title: String = 'angular-pwa-boiler-plate'

  nav = []

  objectKeys = Object.keys

  my_menu = {
    main1: ['sub1', 'sub2'],
    main2: ['sub1', 'sub2'],
  }

  isAuthenticated: boolean = false

  private _mobileQueryListener: () => void

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService, private router: Router, private vars: Vars) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)
  }

  ngOnInit() {
    this.authService.loggedIn.subscribe(x => {
      this.isAuthenticated = x
    })

    this.getNav()
  }

  getNav() {
    if (this.vars.debug) {
      this.nav.push({
        title: 'Home',
        path: '/home',
        icon: 'home',
        children: [
          {
            title: 'Debug',
            path: '/home/debug',
            icon: 'settings_applications',
          },
        ],
      })
    } else {
      this.nav.push({
        title: 'Home',
        path: '/home',
        icon: 'home',
      })
    }

    if (!this.isAuthenticated) {
      this.nav.push({
        title: 'Sign In',
        path: '/auth/login',
        icon: 'account_box',
      })
    } else {
      this.nav.push({
        title: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
      })
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }

  logout() {
    this.authService.logOut()
    this.router.navigate(['home'])
  }
}
