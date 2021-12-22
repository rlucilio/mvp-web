import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseFindProvider } from './responses';
@Injectable()
export class ProviderService {
  private readonly BASE_URL = `${environment.urlServe}/provider`;
  constructor(
    private readonly http: HttpClient,
    private readonly spinner: NgxSpinnerService
  ) {}

  updateProvider(email: string, bio: Date) {
    this.spinner.show();
    return this.http
      .put<void>(
        `${this.BASE_URL}/update`,
        {
          email,
          bio,
        },
        { headers: { KEY_ACCESS_TOKEN: '' } }
      )
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  findProvider(email: string) {
    this.spinner.show();
    return this.http
      .get<ResponseFindProvider>(`${this.BASE_URL}/find?email=${email}`, {
        headers: { KEY_ACCESS_TOKEN: '' },
      })
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }
}
