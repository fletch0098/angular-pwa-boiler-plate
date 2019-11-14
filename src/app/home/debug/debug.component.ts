import { Component, OnInit, OnDestroy } from '@angular/core'
import { HomeService } from '../../core/services/home.service'

import { AppLoaderService } from '../../core/services/app-loader.service'
import { UtilityService } from '../../core/services/utility.service'
import { LoggingService } from '../../core/services/logging.service'
import { NotificationService } from '../../core/services/notification.service'
import { ConfirmActionService } from '../../core/services/confirmAction.service'
import { Vars } from '../../core/vars'
import { AppResponse } from '../../shared/models/appResponse.interface'

@Component({
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
})
export class DebugComponent implements OnInit {
  name: string = 'DebugComponent'
  appResponse: AppResponse
  selectedError: number = 5000

  errorList: any[] = [
    {
      code: 5000,
      name: 'App Error',
    },
    {
      code: 5001,
      name: 'Not Implemented',
    },
    {
      code: 4000,
      name: 'Validation Error',
    },
    {
      code: 4001,
      name: 'UnAuthorized Error',
    },
    {
      code: 4003,
      name: 'Forbidden Error',
    },
    {
      code: 4004,
      name: 'NotFound Error',
    },
    {
      code: 4005,
      name: 'UniqueUserName Error',
    },
  ]

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
   * On Component Initialize, get app
   */
  ngOnInit(): void {
    this.app()
  }

  /**
   * Get Api app
   */
  app(): void {
    let operation: string = 'app'
    this.appLoaderService.startRequest()
    this.homeService.app().subscribe(
      result => {
        this.appResponse = result
        this.appLoaderService.endRequest()
      },
      err => {
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

  error(): void {
    let operation: string = 'error'

    this.loggingService.debug('', this.name, operation, { errorCode: this.selectedError })

    this.homeService.error(this.selectedError).subscribe()
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
