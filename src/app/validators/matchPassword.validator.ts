import {ValidatorFn, ValidationErrors, FormGroup} from '@angular/forms';

export function ValidationMatchPassword(password: string, confirm: string): ValidatorFn | any {
  return (control: FormGroup): ValidationErrors | null => {
    const passwordControl = control.get(password);
    const confirmControl = control.get(confirm);

    if (passwordControl?.value !== confirmControl?.value) {
      confirmControl?.setErrors({invalidPassword: true});
    }

    return null;
  };
}
