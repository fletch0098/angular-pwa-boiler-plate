import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

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

  constructor(private _router: Router, private authService: AuthService) {}

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
    let credentials = {
      username: this.emailInput.value,
      password: this.passwordInput.value,
    }

    this.authService.login(credentials).subscribe(
      result => {
        console.log('logged in', result)
      },
      err => {
        console.log(err)
      }
    )
  }
}
