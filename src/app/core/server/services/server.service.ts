import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServerService {
  constructor(
    private readonly http: HttpClient,
    private readonly spinner: NgxSpinnerService
  ) {}

  verifyServer() {
    this.spinner.show();
    return this.http
      .get(`${environment.urlServe}/healthchecks/liveness`, {
        headers: { access_token: '' },
      })
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }
}
