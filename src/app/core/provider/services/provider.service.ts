import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ResponseFindProvider {
  name: string;
  specialty: string;
  bio: string;
  email: string;
  state: string;
  urlPhoto: string;
  phone: string;
  gender: string;
}

@Injectable()
export class ProviderService {
  private readonly BASE_URL = `${environment.urlServe}/provider`;
  constructor(private readonly http: HttpClient) {}

  updateProvider(email: string, bio: Date) {
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

  findProvider(email: string) {
    return this.http
      .get<ResponseFindProvider>(`${this.BASE_URL}/find?email=${email}`, {
        headers: { KEY_ACCESS_TOKEN: '' },
      })
      .pipe(first());
  }
}
