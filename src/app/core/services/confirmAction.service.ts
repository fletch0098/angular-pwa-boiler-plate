import { Injectable } from '@angular/core'
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material'

import { ConfirmComponent } from '../components/confirm/confirm.component'
import { LoggingService } from './logging.service'

@Injectable({
  providedIn: 'root',
})
export class ConfirmActionService {
  name: string = 'ConfirmActionService'

  constructor(private bottomSheet: MatBottomSheet, private loggingService: LoggingService) {}

  confirmAction(): MatBottomSheetRef {
    let operation: string = 'confirmAction'
    this.loggingService.trace(this.name, operation)
    return this.bottomSheet.open(ConfirmComponent, {
      // data: 'Test',
    })

    // sheetRef.afterDismissed().subscribe(data => {
    //   console.log(data)
    //   // handle your code working according to different actions.
    //   if (data && data.message == 'Cancel') {
    //     alert('Cancel was clicked in bottomsheet')
    //   }
    //   if (data && data.message == 'Confirmed') {
    //     alert('Change Status was clicked in bottomsheet')
    //   }
    // })
  }
}
