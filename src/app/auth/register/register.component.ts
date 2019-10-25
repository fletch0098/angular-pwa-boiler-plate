import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatBottomSheet } from '@angular/material'
import { CountryCodeSelectComponent } from '../../shared/components/country-code-select/country-code-select.component'
import { CountryCode } from '../../shared/components/country-code-select/country-codes'

import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true
  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.min(10)]),
    fname: new FormControl('', [Validators.min(2)]),
    lname: new FormControl('', [Validators.min(2)]),
  })

  countryCode = '+1'

  get emailInput() {
    return this.signupForm.get('email')
  }
  get passwordInput() {
    return this.signupForm.get('password')
  }
  get fnameInput() {
    return this.signupForm.get('fname')
  }
  get lnameInput() {
    return this.signupForm.get('lname')
  }
  get phoneInput() {
    return this.signupForm.get('phone')
  }

  constructor(private _bottomSheet: MatBottomSheet, private _router: Router) {}

  ngOnInit() {}

  selectCountryCode() {
    this._bottomSheet
      .open(CountryCodeSelectComponent)
      .afterDismissed()
      .subscribe((data: CountryCode) => {
        this.countryCode = data ? data.dial_code : this.countryCode
      })
  }

  getEmailInputError() {
    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.'
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.'
    }
  }

  getPasswordInputError() {
    if (this.passwordInput.hasError('required')) {
      return 'A password is required.'
    }
  }

  shouldEnableSubmit() {
    return !this.emailInput.valid || !this.passwordInput.valid || !this.fnameInput.valid || !this.lnameInput.valid || !this.phoneInput.valid
  }

  signUp() {
    console.log('signUp()')
  }
}
