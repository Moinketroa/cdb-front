import {Component} from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'cdb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent {
  title: string;
  constructor(private appService: AppService) {
    this.appService.title$.subscribe( newTitle => {
      this.title = newTitle;
    });
  }
}
