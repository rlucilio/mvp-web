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

export const verifyEmailNotUsedValidator = (
  userAuthService: UserAuthService
) => {
  return (control: AbstractControl) =>
    control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((valueInput) =>
        userAuthService.isFirstAccess(control.value).pipe(
          map((response) => ({
            emailInUse: true,
          })),
          catchError(() => {
            return of(null);
          })
        )
      ),
      first()
    );
};
