/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class JwtIntercepterService implements HttpInterceptor {
  constructor(
    private authService: AuthentificationService,
    private dataService: DataService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('/login')) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
    return next.handle(request);
  }
}
