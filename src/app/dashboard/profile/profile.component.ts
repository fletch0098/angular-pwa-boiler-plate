import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { NotificationService } from '../../core/services/notification.service'
import { UserService } from '../../core/services/user.service'

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private _router: Router, private notificationService: NotificationService, private userservice: UserService) {}

  ngOnInit(): void {
    this.userservice.loggedInUser().subscribe(data => {
      console.log(data)
    })
  }
}
