import {Component, ViewEncapsulation} from '@angular/core';
import { AppService } from './app.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'cdb-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent {
  title: string;
  constructor(private appService: AppService, public translate: TranslateService) {
    this.appService.title$.subscribe( newTitle => {
      this.title = newTitle;
    });
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
}
