import {Component} from '@angular/core';

@Component({
  selector: 'cdb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Computer Database';

  constructor() {
    for (let i = 0; i > -1; i++) {
      console.log();
    }
  }
}
