import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { MaterialModule } from './material.module'

import { CountryCodeSelectComponent } from '../components/country-code-select/country-code-select.component'
import { FilterPipe } from '../components/country-code-select/filter.pipe'
import { AppNotificationComponent } from '../components/app-notification/app-notification.component'

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MaterialModule],
  declarations: [CountryCodeSelectComponent, FilterPipe, AppNotificationComponent],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule, AppNotificationComponent],
  entryComponents: [CountryCodeSelectComponent],
  providers: [],
})
export class SharedModule {}
