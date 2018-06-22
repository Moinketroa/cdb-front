import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

     let head: HttpHeaders = req.headers; // .set('Content-Type', 'application/json');
     head = head.append('Access-Control-Allow-Origin', '*');
      const idToken = localStorage.getItem(UserService.token_key);

    if (idToken) {
      // head = head.set('Content-Type', 'application/x-www-form-urlencoded');
      // head = head.append('Access-Control-Allow-Origin', '*');
      // console.log(idToken);
      head = head.set('Authorization', 'Bearer ' + idToken);
    }

    const cloned = req.clone({
      headers: head
    });

    // console.log(cloned);
    return next.handle(cloned);
  }
}
