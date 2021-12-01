import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProviderService {
  private readonly BASE_URL = `${environment.urlServe}/provider`;
  constructor(private readonly http: HttpClient) {}

  updateBenefit(email: string, bio: Date) {
    return this.http
      .put<void>(
        `${this.BASE_URL}/update`,
        {
          email,
          bio,
        },
        { headers: { KEY_ACCESS_TOKEN: '' } }
      )
      .pipe(first());
  }
}
