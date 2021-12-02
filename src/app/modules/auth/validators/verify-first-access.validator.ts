import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  of,
  switchMap,
} from 'rxjs';
import { UserAuthService } from 'src/app/core/user-auth/services/user-auth.service';

export const verifyFirstAccessValidator = (
  userAuthService: UserAuthService
) => {
  return (control: AbstractControl) =>
    control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((valueInput) =>
        userAuthService.isFirstAccess(control.value).pipe(
          map((response) =>
            response.result
              ? {
                  firstAccess: true,
                }
              : null
          ),
          catchError((err) => {
            if ((err as HttpErrorResponse).status === HttpStatusCode.NotFound) {
              return of({ notFoundEmail: true });
            }
            return of(null);
          })
        )
      ),
      first()
    );
};
