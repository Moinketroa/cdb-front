import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../company/company.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cdb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public static token_key = 'token';
  private user: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.userService.authenticate(this.user).subscribe(res => this.setSession);
    this.router.navigateByUrl('/');
  }

  private setSession(token) {
    localStorage.setItem(LoginComponent.token_key, token);
    console.log(localStorage.getItem(LoginComponent.token_key));
  }
}
