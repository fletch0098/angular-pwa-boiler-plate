import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/modules/shared.module'

import { AuthRoutes } from './auth.routing'
import { LogInComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

@NgModule({
  imports: [SharedModule, CommonModule, RouterModule.forChild(AuthRoutes)],
  declarations: [LogInComponent, RegisterComponent],
  providers: [],
})
export class AuthModule {}
