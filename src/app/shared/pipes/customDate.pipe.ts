import { Pipe, PipeTransform } from '@angular/core'
import { DatePipe } from '@angular/common'
import { UtilityService } from '../../core/services/utility.service'
import { Vars } from '../../core/vars'

@Pipe({ name: 'customDate' })
export class CustomDate implements PipeTransform {
  constructor(public utilityService: UtilityService, public vars: Vars) {}

  // adding a default format in case you don't want to pass the format
  // then 'yyyy-MM-dd' will be used
  transform(date: Date | string, format: string = this.vars.dateFormat, timezone?: string, locale: string = 'en-US'): string {
    date = new Date(date) // if orginal type was a string
    return this.utilityService.formatDate(date, format)
  }
}
