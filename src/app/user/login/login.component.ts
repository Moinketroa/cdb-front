import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cdb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private user: User;

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
