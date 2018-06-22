import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'cdb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isConnected(): boolean {
    return localStorage.getItem(UserService.token_key) === null;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']).catch();
  }

}
