import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/modules/shared.module'

import { AuthRoutes } from './auth.routing'
import { AuthComponent } from './auth/auth.component'

@NgModule({
  imports: [SharedModule, CommonModule, RouterModule.forChild(AuthRoutes)],
  declarations: [AuthComponent],
})
export class AuthModule {}
