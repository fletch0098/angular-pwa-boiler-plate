import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { LoggingService } from '../../services/logging.service'

@Injectable()
export class AppLoaderService {
  name: string = 'AppLoaderService'

  constructor(private loggingService: LoggingService) {}

  private isLoadingSource = new BehaviorSubject<boolean>(false)
  isLoading = this.isLoadingSource.asObservable()

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
}
