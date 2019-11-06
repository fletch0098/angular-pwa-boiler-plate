import { Injectable } from '@angular/core'
import { Vars } from '../../core/vars'
import { LoggingService } from '../../core/services/logging.service'
import { NotificationService } from './notification.service'

import * as moment from 'moment'

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  name: string = 'UtilityService'

  constructor(private vars: Vars, private loggingService: LoggingService, private notificationService: NotificationService) {}

  notImplemented(name?: string, operation?: string): void {
    this.loggingService.warn('This operation is not implemented yet', name, operation)
    this.notificationService.warn('This operation is not implemented yet')
  }

  formatDate(date?: Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return moment(date ? date : new Date()).format(format)
  }
}
