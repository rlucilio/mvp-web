import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KEY_ACCESS_TOKEN, KEY_USER } from '../../shared/constants';
import { StorageService } from '../../storage/services/storage.service';

@Injectable()
export class UserAuthService {
  private readonly BASE_URL = `${environment.urlServe}/users`;
  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly spinner: NgxSpinnerService
  ) {}

  isFirstAccess(email: string) {
    this.spinner.show();
    return this.http
      .get<{ result: boolean }>(
        `${this.BASE_URL}/is-first-login?email=${email}`
      )
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  login(email: string, pass: string) {
    this.spinner.show();
    this.storageService.set(KEY_USER, JSON.stringify({ email, pass }));
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
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  requestChangePass(email: string) {
    this.spinner.show();
    return this.http
      .put<void>(`${this.BASE_URL}/request-change-pass`, {
        email,
      })
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  changePass(email: string, newPass: string, oldPass: string) {
    this.spinner.show();
    return this.http
      .put<void>(`${this.BASE_URL}/change-pass`, {
        email,
        newPass,
        oldPass,
      })
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  changeEmail(email: string, newPass: string, oldPass: string) {
    this.spinner.show();
    return this.http
      .put(`${this.BASE_URL}/change-pass`, { email, newPass, oldPass })
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  updateUser(
    email: string,
    newPass: string,
    newEmail: string,
    name: string,
    mobilePhone: string,
    gender: string
  ) {
    this.spinner.show();
    return this.http
      .put<void>(`${this.BASE_URL}/update`, {
        oldEmail: email,
        newPass,
        newEmail,
        name,
        mobilePhone,
        acceptTerm: true,
        gender,
      })
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  verifyTokenChangePass(email: string, token: string) {
    this.spinner.show();
    return this.http
      .get<{ result: boolean }>(
        `${this.BASE_URL}/verify-token-change-pass?email=${email}&token=${token}`
      )
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }
}
