import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserAuthService {
  private readonly BASE_URL = `${environment.urlServe}/users`;
  constructor(
    private readonly http: HttpClient
  ) { }

  isFirstAccess(email: string) {
    return this.http.get(`${this.BASE_URL}/is-first-login?email=${email}`);
  }

  login(email: string, pass: string): Observable<null> {
    return this.http
      .post<null>(`${this.BASE_URL}/login`, { email, pass }, {  observe: 'response' })
      .pipe(
        tap(response => console.log(response.headers.get('x-access-token'))),
        map(response => response.body)
      );
  }
}
