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

  /**
   * Start the app loader and set a timer to hide loader
   */
  onStart(): void {
    let operation: string = 'onStart'
    this.loggingService.trace(this.name, operation)
    this.appLoaderService.startRequest()
    this.appLoaderService.startRequest()

    setTimeout(() => {
      this.appLoaderService.endRequest()
    }, 3000)
  }

  successNotification(): void {
    let operation: string = 'successNotification'

    this.loggingService.trace(this.name, operation)
    this.notificationService
      .success('Success', 'successBtn')
      .afterDismissed()
      .subscribe(dismissed => {
        if (dismissed && dismissed.dismissedByAction === true) {
          this.loggingService.info('Action pressed', this.name, operation, dismissed)
        }
      })
  }

  warnNotification(): void {
    let operation: string = 'warnNotification'

    this.loggingService.trace(this.name, operation)
    this.notificationService.warn('Warn', 'warnBtn')
  }

  errorNotification(): void {
    let operation: string = 'errorNotification'

    this.loggingService.trace(this.name, operation)
    this.notificationService.error('Error', 'errorBtn')
  }

  infoNotification(): void {
    let operation: string = 'infoNotification'

    this.loggingService.trace(this.name, operation)
    this.notificationService.info('Info', 'infoBtn')
  }

  /**
   * Ask for confirmation and subscribe to response
   */
  confirm(): void {
    let operation: string = 'confirm'

    this.loggingService.trace(this.name, operation)
    this.confirmActionService
      .confirmAction()
      .afterDismissed()
      .subscribe(response => {
        if (response && response.message == 'Confirmed') {
          this.loggingService.info('Action Confirmed', this.name, operation)
        }
      })
  }
}
