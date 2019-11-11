import { Component, OnInit, OnDestroy } from '@angular/core'
import { HomeService } from '../../core/services/home.service'

import { AppLoaderService } from '../../core/components/app-loader/app-loader.service'
import { UtilityService } from '../../core/services/utility.service'
import { LoggingService } from '../../core/services/logging.service'
import { NotificationService } from '../../core/services/notification.service'

import { ConfirmComponent } from '../../core/components/confirm/confirm.component'

import { MatBottomSheet } from '@angular/material'

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
    private bottomSheet: MatBottomSheet
  ) {}

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

  successNotification(): void {
    let operation: string = 'successNotification'

    this.loggingService.trace(this.name, operation)
    this.notificationService.success('Success', 'successBtn')
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

  confirm(): void {
    let operation: string = 'confirm'

    this.loggingService.trace(this.name, operation)
    let sheetRef = this.bottomSheet.open(ConfirmComponent, {
      data: 'Test',
    })

    sheetRef.afterDismissed().subscribe(data => {
      console.log(data)
      // handle your code working according to different actions.
      if (data && data.message == 'Cancel') {
        alert('Cancel was clicked in bottomsheet')
      }
      if (data && data.message == 'Confirmed') {
        alert('Change Status was clicked in bottomsheet')
      }
    })
  }
}
