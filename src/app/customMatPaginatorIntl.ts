import {MatPaginatorIntl} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  translate: TranslateService;
  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant('PAGE.ITEMS');

    this.nextPageLabel = this.translate.instant('PAGE.NEXT');
    this.previousPageLabel = this.translate.instant('PAGE.PREVIOUS');

    this.lastPageLabel = this.translate.instant('PAGE.LAST');
    this.firstPageLabel = this.translate.instant('PAGE.FIRST');
  }

}
