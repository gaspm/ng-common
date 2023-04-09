import {ValidationErrors, AbstractControl} from '@angular/forms';

function getControlNumber(ico: string): string {
  const checksum: number = ico
    .split('')
    .reduce((sum, d, index) => (index < 7 ? Number(d) * (8 - index) + sum : sum), 0);
  const modulus: number = checksum % 11;
  if (modulus === 1) {
    return '0';
  } else if (modulus === 0) {
    return '1';
  }
  return '' + (11 - modulus);
}

export function IcoValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value) {
    const regExp = /\d{8}$/i;
    const propertyValue: string = control.value;
    const value: string = ('00000000' + propertyValue).slice(-8);
    const isFormatOk: boolean = regExp.test(value);
    const isCheckSumOk: boolean = value.endsWith(getControlNumber(value));
    if (!isFormatOk || !isCheckSumOk) {
      return {
        invalidIco: {
          format: !isFormatOk,
          checksum: !isCheckSumOk,
        },
      };
    }
  }
  return null;
}
