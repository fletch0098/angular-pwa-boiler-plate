import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/modules/shared.module'

import { HomeRoutes } from './home.routing'
import { HomeComponent } from './home/home.component'
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component'

import { DebugComponent } from './debug/debug.component'
import { DebugService } from './debug/debug.service'

import { RateService } from './exchange-rates/rate.service'

import { HomeService } from './home.service'

@NgModule({
  imports: [SharedModule, CommonModule, RouterModule.forChild(HomeRoutes)],
  declarations: [HomeComponent, ExchangeRatesComponent, DebugComponent],
  providers: [RateService, DebugService, HomeService],
})
export class HomeModule {}
