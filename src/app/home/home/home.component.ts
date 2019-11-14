import { Component, OnInit, OnDestroy } from '@angular/core'
import { HomeService } from '../../core/services/home.service'

import { AppLoaderService } from '../../core/services/app-loader.service'
import { UtilityService } from '../../core/services/utility.service'
import { LoggingService } from '../../core/services/logging.service'
import { NotificationService } from '../../core/services/notification.service'
import { ConfirmActionService } from '../../core/services/confirmAction.service'
import { Vars } from '../../core/vars'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name: string = 'HomeComponent'
  apiStatus: string = 'Not Connected'

  constructor(
    private homeService: HomeService,
    private appLoaderService: AppLoaderService,
    private notificationService: NotificationService,
    private utilityService: UtilityService,
    private loggingService: LoggingService,
    private confirmActionService: ConfirmActionService,
    private vars: Vars
  ) {}

  /**
   * On Component Initialize, Show loader and check api status
   */
  ngOnInit(): void {
    this.appLoaderService.startRequest()
    this.status()
  }

  /**
   * Get Api status
   */
  status(): void {
    let operation: string = 'status'
    this.homeService.status().subscribe(
      result => {
        this.loggingService.info('Api Connected Successfully', this.name, operation)
        this.apiStatus = result
        this.appLoaderService.endRequest()
      },
      err => {
        this.loggingService.warn('Api Not connected', this.name, operation, err)
        this.appLoaderService.endRequest()
      }
    )
  }
}
