import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'cdb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() translate: TranslateService;

  constructor() {}

  ngOnInit() {
  }

  scrollTop() {
    const posYInit = window.pageYOffset;
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 0.1 * posYInit);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}
