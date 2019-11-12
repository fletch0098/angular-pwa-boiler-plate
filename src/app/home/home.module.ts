import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/modules/shared.module'

import { HomeRoutes } from './home.routing'
import { HomeComponent } from './home/home.component'
import { DebugComponent } from './debug/debug.component'

@NgModule({
  imports: [SharedModule, CommonModule, RouterModule.forChild(HomeRoutes)],
  declarations: [HomeComponent, DebugComponent],
  providers: [],
})
export class HomeModule {}
