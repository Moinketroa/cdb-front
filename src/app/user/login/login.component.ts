import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../company/company.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = new User('', '');
  }

  ngOnInit() {}

  login() {
    localStorage.removeItem(UserService.token_key);
    this.userService.authenticate(this.user).subscribe(res => this.setSession(res));
    this.router.navigateByUrl('/');
  }

  private setSession(res) {
    localStorage.setItem(UserService.token_key, res.token);
    console.log(localStorage.getItem(UserService.token_key));
  }
}
