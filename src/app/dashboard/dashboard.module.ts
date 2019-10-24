import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/modules/shared.module'

import { DashboardRoutes } from './dashboard.routing'
import { DashboardComponent } from './dashboard/dashboard.component'

@NgModule({
  imports: [SharedModule, CommonModule, RouterModule.forChild(DashboardRoutes)],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
