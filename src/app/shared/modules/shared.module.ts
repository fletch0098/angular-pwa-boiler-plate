import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { BlankComponent } from '../components/blank/blank.component'
import { FullLayoutComponent } from '../components/full/full.component'
import { MenuLayoutComponent } from '../components/menu/menu.component'

import { MaterialModule } from './material.module'

import { CountryCodeSelectComponent } from '../components/country-code-select/country-code-select.component'
import { FilterPipe } from '../components/country-code-select/filter.pipe'

import { StorageService } from '../services/storage.service'
import { Globals } from '../globals'

import { AppLoaderService } from '../components/app-loader/app-loader.service'
import { AppLoaderComponent } from '../components/app-loader/app-loader.component'

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MaterialModule],
  declarations: [BlankComponent, FullLayoutComponent, MenuLayoutComponent, CountryCodeSelectComponent, FilterPipe, AppLoaderComponent],
  exports: [BlankComponent, FullLayoutComponent, MenuLayoutComponent, MaterialModule, FormsModule, ReactiveFormsModule, AppLoaderComponent],
  entryComponents: [CountryCodeSelectComponent, AppLoaderComponent],
  providers: [Globals, StorageService, AppLoaderService],
})
export class SharedModule {}
