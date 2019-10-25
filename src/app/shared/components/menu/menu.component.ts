import { Component, ChangeDetectorRef, EventEmitter, Output, OnInit } from '@angular/core'

import { MediaMatcher } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material'
@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuLayoutComponent implements OnInit {
  mobileQuery: MediaQueryList
  title: String = 'angular-pwa-boiler-plate'

  nav = [
    {
      title: 'Home',
      path: '/home',
    },
    {
      title: 'Auth',
      path: '/auth/',
    },
  ]

  private _mobileQueryListener: () => void
  @Output() toggleSideNav = new EventEmitter()

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)
  }

  ngOnInit() {
    // if (this.router.url === '/') {
    //   this.router.navigate(['/home'])
    // }
  }

  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle()
    }
  }
}
