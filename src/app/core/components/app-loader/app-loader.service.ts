import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { LoggingService } from '../../services/logging.service'

@Injectable()
export class AppLoaderService {
  name: string = 'AppLoaderService'

  constructor(private loggingService: LoggingService) {}

  private isLoadingSource = new BehaviorSubject<boolean>(false)
  isLoading = this.isLoadingSource.asObservable()

  private requestCount: number = 0

  show() {
    let operation: string = 'show'
    this.isLoadingSource.next(true)
    this.loggingService.debug('Show loader called', this.name, operation)
  }

  hide() {
    let operation: string = 'hide'
    this.isLoadingSource.next(false)
    this.loggingService.debug('Hide loader called', this.name, operation)
  }

  startRequest(): void {
    let operation: string = 'startRequest'
    // If this is the first request,start the spinner
    if (this.requestCount == 0) {
      this.show()
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
        this.hide()
      }
      this.loggingService.debug('Counter at: ' + this.requestCount, this.name, operation)
    }, 1000)
  }
}
