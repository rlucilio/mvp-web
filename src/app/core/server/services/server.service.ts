import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServerService {
  constructor(private readonly http: HttpClient) {}

  verifyServer() {
    return this.http
      .get(`${environment.urlServe}/healthchecks/liveness`, {
        headers: { access_token: '' },
      })
      .pipe(first());
  }
}
