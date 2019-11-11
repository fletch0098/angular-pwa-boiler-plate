import { Component, OnInit, Inject } from '@angular/core'
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material'

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  constructor(private bottomSheetRef: MatBottomSheetRef<ConfirmComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  title: string
  clearBar(): void {
    this.bottomSheetRef.dismiss()
    event.preventDefault()
  }

  confirm() {
    this.bottomSheetRef.dismiss({
      message: 'Confirmed',
    })
  }

  ngOnInit() {
    console.log('data received')
  }
}
