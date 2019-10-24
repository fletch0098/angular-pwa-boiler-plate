import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { BlankComponent } from '../components/blank/blank.component'
import { FullComponent } from '../components/full/full.component'
import { SpinnerComponent } from '../components/spinner.component'

import { MaterialModule } from './material.module'

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MaterialModule],
  declarations: [SpinnerComponent, BlankComponent, FullComponent],
  exports: [SpinnerComponent, BlankComponent, FullComponent],
  entryComponents: [],
  providers: [],
})
export class SharedModule {}
