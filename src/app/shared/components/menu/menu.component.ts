import { Component, ChangeDetectorRef, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core'

import { MediaMatcher } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material'
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

  private _mobileQueryListener: () => void

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }
}
