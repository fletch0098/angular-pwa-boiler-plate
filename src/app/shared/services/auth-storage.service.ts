import { Injectable } from '@angular/core'
import { Vars } from '../vars'
import { LoginResponse } from '../models/loginResponse.interface'
import { LocalStorageService } from './local-storage.service'

/**
 * Authorization storage service for app authentication
 */
@Injectable()
export class AuthStorageService {
  constructor(private vars: Vars, private localStorgaeService: LocalStorageService) {}

  /**
   * Store authorization credentials in local storage
   * @param loginResponse - The response from login
   */
  setAuthorizationCredentials(loginResponse: LoginResponse): void {
    let value = JSON.stringify(loginResponse)
    let key = 'app_auth'

    this.localStorgaeService.setItem(key, value)
  }

  /**
   * Retreive authorization credentials from local storage
   */
  getAuthorizationCredentials(): LoginResponse {
    let key = 'app_auth'
    let value = this.localStorgaeService.getItem(key)
    let loginResponse: LoginResponse = JSON.parse(value)
    return loginResponse
  }

  /**
   * clear authorization credentials from local storage
   */
  clearAuthorizationCredentials(): void {
    let key = 'app_auth'
    this.localStorgaeService.clearItem(key)
  }
}
