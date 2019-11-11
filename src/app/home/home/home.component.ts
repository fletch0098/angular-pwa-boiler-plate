import { Component, OnInit, OnDestroy } from '@angular/core'
import { HomeService } from '../../core/services/home.service'

import { AppLoaderService } from '../../core/components/app-loader/app-loader.service'
import { UtilityService } from '../../core/services/utility.service'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  apiStatus: string = 'Not Connected'

  constructor(private homeService: HomeService, private appLoaderService: AppLoaderService, private utilityService: UtilityService) {}

  ngOnInit() {
    this.appLoaderService.startRequest()
    this.status()
  }

  status(): void {
    this.homeService.status().subscribe(
      result => {
        this.apiStatus = result
        this.appLoaderService.endRequest()
      },
      err => {
        console.error(err)
        this.appLoaderService.endRequest()
      }
    )
  }

  onStart(): void {
    console.log('onStart')
    this.appLoaderService.startRequest()
    setTimeout(() => {
      console.log('hide')
      this.appLoaderService.endRequest()
    }, 3000)
  }

  onNotImplemented(): void {
    this.utilityService.notImplemented('home', 'test')
  }
}
