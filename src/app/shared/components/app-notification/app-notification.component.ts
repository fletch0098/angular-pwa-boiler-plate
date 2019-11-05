import { Component, Inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA } from '@angular/material'

@Component({
  selector: 'app-notification',
  templateUrl: './app-notification.component.html',
  styleUrls: ['./app-notification.component.scss'],
})
export class AppNotificationComponent {
  title: string = 'Error'
  message: string = 'There was an error'

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
