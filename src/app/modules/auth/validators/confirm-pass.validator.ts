import { AbstractControl } from '@angular/forms';

export const confirmPassValidator = (control: AbstractControl) => {
  const newPass = control.get('newPass')?.value;
  const passConfirm = control.get('newPassConfirm')?.value;

  if (newPass === passConfirm) {
    return null;
  } else {
    return { passConfirm: true };
  }
};
