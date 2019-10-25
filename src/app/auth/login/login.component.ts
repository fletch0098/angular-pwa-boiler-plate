import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LogInComponent {
  signinForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  hide = true

  get emailInput() {
    return this.signinForm.get('email')
  }
  get passwordInput() {
    return this.signinForm.get('password')
  }

  constructor(private _router: Router) {}

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

  signIn() {
    // this._loader.show();
    console.log('signIn()')
  }
}
