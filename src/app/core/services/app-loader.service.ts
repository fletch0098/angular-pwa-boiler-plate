import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { LoggingService } from './logging.service'
import { NotificationService } from './notification.service'
import { Vars } from '../vars'

@Injectable()
export class AppLoaderService {
  private name: string = 'AppLoaderService'

  constructor(private loggingService: LoggingService, private notificationService: NotificationService, private vars: Vars) {}

  private isLoadingSource = new BehaviorSubject<boolean>(false)
  private requestCount: number = 0

  isLoading = this.isLoadingSource.asObservable()

  hide() {
    let operation: string = 'hide'
    this.loggingService.debug('Hide loader called', this.name, operation)
  }

  startRequest(): void {
    let operation: string = 'startRequest'
    this.loggingService.trace(this.name, operation)

    // If this is the first request,start the spinner
    if (this.requestCount == 0) {
      this.isLoadingSource.next(true)

      // Set a failsafe timeout
      setTimeout(() => {
        if (this.requestCount !== 0) {
          this.loggingService.warn('Loading timeout', this.name, operation, { requestCount: this.requestCount })
          this.isLoadingSource.next(false)
          this.requestCount = 0
          this.notificationService.error(this.vars.requestTimeoutMessage)
        }
      }, this.vars.requestTimeout)
    }

    this.requestCount++
    this.loggingService.debug('Counter at: ' + this.requestCount, this.name, operation)
  }

  endRequest(): void {
    let operation: string = 'endRequest'
    this.loggingService.trace(this.name, operation)

    setTimeout(() => {
      if (this.requestCount == 0) return

      this.requestCount--

      if (this.requestCount == 0) {
        this.isLoadingSource.next(false)
      }
      this.loggingService.debug('Counter at: ' + this.requestCount, this.name, operation)
    }, 200)
  }
}
