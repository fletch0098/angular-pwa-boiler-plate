import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/modules/shared.module'

import { DashboardRoutes } from './dashboard.routing'
import { ProfileComponent } from './profile/profile.component'

@NgModule({
  imports: [SharedModule, CommonModule, RouterModule.forChild(DashboardRoutes)],
  declarations: [ProfileComponent],
  providers: [],
})
export class DashboardModule {}
