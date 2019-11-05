import { Component, ChangeDetectorRef, EventEmitter, Output, OnInit } from '@angular/core'

import { MediaMatcher } from '@angular/cdk/layout'

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  mobileQuery: MediaQueryList
  title: String = 'angular-pwa-boiler-plate'

  private _mobileQueryListener: () => void
  @Output() toggleSideNav = new EventEmitter()

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)
  }

  ngOnInit() {}
}
