import {Component, Input, OnInit} from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AppService } from '../../app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'cdb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('Animation', [
      state('init', style({opacity: 1, transform: 'translateY(0)'})),
      transition('void => init', [
        style({
          opacity: 0,
          transform: 'translateY(-50%)'
        }),
        animate('0.4s ease-in')
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  getErrorLogin: boolean;

  constructor(private userService: UserService, private router: Router, private appService: AppService, private fb: FormBuilder) {
    if (this.checkTokenIsValid()) {
      this.router.navigate(['/computer']).catch();
    }
    this.createForm();
    this.appService.changeTitle('LOGIN.NAME');
    this.getErrorLogin = false;
  }

  private checkTokenIsValid(): boolean {
    return localStorage.getItem(UserService.token_key) !== null;
  }

  private createForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  login() {
    const user = new User(this.userForm.get('username').value, this.userForm.get('password').value);
    localStorage.removeItem(UserService.token_key);
    this.userService.authenticate(user).subscribe(res => this.setSession(res), error => {
      this.getErrorLogin = true;
    });
  }

  private setSession(res) {
    localStorage.setItem(UserService.token_key, res.token);
    console.log(localStorage.getItem(UserService.token_key));

    setTimeout(() => {
      this
        .router
        .navigate(['/computer']);
    }, 500);
  }
}
