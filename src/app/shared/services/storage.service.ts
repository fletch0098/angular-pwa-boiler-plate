import { Injectable } from '@angular/core'
import { Globals } from '../globals'
import { LoginResponse } from '../models/loginResponse.interface'

@Injectable()
export class StorageService {
  constructor(private globals: Globals) {}

  setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  getLocalStorage(key: string): string {
    let value = localStorage.getItem(key)
    return value
  }

  removeLocalStorage(key: string): void {
    localStorage.removeItem(key)
  }

  clearLocalStorage(): void {
    localStorage.clear()
  }

  setAuthorization(loginResponse: LoginResponse): void {
    let value = JSON.stringify(loginResponse)
    let key = 'app_auth'
    this.setLocalStorage(key, value)
  }

  getAuthorization(): LoginResponse {
    let key = 'app_auth'
    let value = this.getLocalStorage(key)
    let loginResponse: LoginResponse = JSON.parse(value)
    return loginResponse
  }

  removeAuthorization(): void {
    this.removeLocalStorage('app_auth')
  }
}
