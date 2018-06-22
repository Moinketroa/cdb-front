import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private titleSource = new Subject<string>();
  title$ = this.titleSource.asObservable();
  changeTitle(newTitle: string) {
    this.titleSource.next(newTitle);
  }
}
