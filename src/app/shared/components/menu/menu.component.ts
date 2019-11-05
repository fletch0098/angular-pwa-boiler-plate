import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'
import { Router } from '@angular/router'

import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuLayoutComponent implements OnDestroy {
  mobileQuery: MediaQueryList

  title: String = 'angular-pwa-boiler-plate'

  nav = [
    {
      title: 'Home',
      path: '/home',
      icon: 'home',
    },
    {
      title: 'Auth',
      path: '/auth/',
      icon: 'account_box',
    },
  ]

  isAuthenticated: boolean = false

  private _mobileQueryListener: () => void

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)
  }

  ngOnInit() {
    this.authService.loggedIn.subscribe(x => {
      this.isAuthenticated = x
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }

  logout() {
    this.authService.logOut()
    this.router.navigate(['home'])
  }
}
