import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KEY_ACCESS_TOKEN } from '../../shared/constants';
import { StorageService } from '../../storage/services/storage.service';

@Injectable()
export class UserAuthService {
  private readonly BASE_URL = `${environment.urlServe}/users`;
  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService
  ) {}

  isFirstAccess(email: string) {
    return this.http.get<{ result: boolean }>(
      `${this.BASE_URL}/is-first-login?email=${email}`
    );
  }

  login(email: string, pass: string) {
    return this.http
      .post<void>(
        `${this.BASE_URL}/login`,
        { email, pass },
        { observe: 'response' }
      )
      .pipe(
        tap((response) =>
          this.storageService.set(
            KEY_ACCESS_TOKEN,
            response.headers.get('x-access-token') || ''
          )
        ),
        map((response) => response.body),
        first()
      );
  }

  requestChangePass(email: string) {
    return this.http
      .put<void>(`${this.BASE_URL}/request-change-pass`, {
        email,
      })
      .pipe(first());
  }

  changeEmail(email: string, newPass: string, oldPass: string) {
    return this.http
      .put('/change-pass', { email, newPass, oldPass })
      .pipe(first());
  }

  createPass(email: string, newPass: string) {
    return this.http.put('/create-pass', { email, newPass }).pipe(first());
  }
}
