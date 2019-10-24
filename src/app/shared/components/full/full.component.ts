import { Component, ChangeDetectorRef, EventEmitter, Output, OnInit } from '@angular/core'

import { MediaMatcher } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material'
@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent implements OnInit {
  mobileQuery: MediaQueryList
  title: String = 'angular-pwa-boiler-plate'

  nav = [
    {
      title: 'Dashboard',
      path: '/dashboard',
    },
    {
      title: 'Auth',
      path: '/auth/auth',
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
    //   this.router.navigate(['/dashboard'])
    // }
  }

  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle()
    }
  }
}
