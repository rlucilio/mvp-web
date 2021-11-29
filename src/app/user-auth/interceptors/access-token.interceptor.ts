import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/storage/services/storage.service';
import { KEY_ACCESS_TOKEN } from 'src/app/shared/constants';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  constructor(private readonly storageService: StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const keys = request.headers.keys();

    const newRequest = request.clone();
    if (
      keys.includes(KEY_ACCESS_TOKEN) &&
      !request.headers.get(KEY_ACCESS_TOKEN)
    ) {
      const access_token = this.storageService.get(KEY_ACCESS_TOKEN);
      newRequest.headers.set(KEY_ACCESS_TOKEN, access_token || '');
    }

    return next.handle(request);
  }
}
