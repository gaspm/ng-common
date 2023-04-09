import {ValidationErrors, AbstractControl} from '@angular/forms';
import {PhoneNumberPrefixes} from '../values/phone-number-prefixes';

export function PhoneNumberValidator(control: AbstractControl): ValidationErrors | null {
  if (control) {
    const regExpSk = /^[+]421[0-9]{9}$/i;
    const regExpEu = /^[0-9]{7,15}$/i;
    const looksLikeSkNumber: boolean = control?.value ? control.value.startsWith('+421') : false;

    if (control.value && !looksLikeSkNumber) {
      const isEuNumber: boolean = regExpEu.test(control.value);
      if (!isEuNumber) {
        return {phoneKeyEU: true};
      }
    } else if (control.value) {
      const isSkNumber: boolean = regExpSk.test(control.value);
      if (isSkNumber) {
        if (control.value.startsWith('+4219')) {
          const mobilePhonePrefix: string = control.value.slice(4, 7);
          if (PhoneNumberPrefixes.indexOf(mobilePhonePrefix) === -1) {
            return {phoneKeySKPrefix: true};
          }
        }
      } else {
        return {phoneKeySK: true};
      }
    }
  }

  return null;
}
