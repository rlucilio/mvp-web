import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserAuthService {
  private readonly BASE_URL = `${environment.urlServe}/users`;
  constructor(
    private readonly http: HttpClient
  ) { }

  isFirstAccess(email: string) {
    return this.http.get<{ result: boolean }>(`${this.BASE_URL}/is-first-login?email=${email}`);
  }

  login(email: string, pass: string) {
    return this.http
      .post<void>(`${this.BASE_URL}/login`, { email, pass }, {  observe: 'response' })
      .pipe(
        tap(response => console.log(response.headers.get('x-access-token'))),
        map(response => response.body)
      );
  }

  requestChangePass(email: string) {
    return this.http
      .put<void>(`${this.BASE_URL}/request-change-pass`, { email })
  }

  changeEmail(email: string, newPass: string, oldPass: string) {
    return this.http.put('/change-pass', { email, newPass, oldPass });
  }

  createPass(email: string, newPass: string) {
    return this.http.put('/create-pass', { email, newPass });
  }
}
