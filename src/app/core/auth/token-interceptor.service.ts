import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,
  HttpResponse, HttpResponseBase, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  readonly TOKEN_HEADER: string = 'Authorization';
  token: string;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('token');

    const clonedReq = req.clone({
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token })
    });

    return next.handle(clonedReq).pipe(
      tap(this.onSubscribeSuccess.bind(this), this.onSubscribeError.bind(this))
    );
  }

  private onSubscribeSuccess(res: HttpEvent<any>) {
    if (res instanceof HttpResponse) {
      this.updateTokenFromResponse(res);
    }
  }

  updateTokenFromResponse(res: HttpResponseBase) {
    const headerName = this.TOKEN_HEADER;
    if (res.headers && res.headers.has(headerName)) {
      localStorage.setItem('token', res.headers.get(headerName));
    }
  }

  private onSubscribeError(error: HttpEvent<any>) {
    if ((error instanceof HttpErrorResponse)) {
      localStorage.clear();
      this.updateTokenFromResponse(error);
    }
  }

}
