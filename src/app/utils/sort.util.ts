import {KeyValue} from '@angular/common';

export class SortUtil {
  public static sortArrayByOrder(array: any[]): any[] {
    return array.sort((a, b) => a.order - b.order);
  }

  public static keyValueOriginalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>,
  ): number => 0;

  public static numberedKeyOrder(a: KeyValue<number, any>, b: KeyValue<number, any>): number {
    return a.key > b.key ? 1 : b.key > a.key ? -1 : 0;
  }

  public static keyOrder(a: KeyValue<any, any>, b: KeyValue<any, any>): number {
    if (Number.isInteger(a.key) && Number.isInteger(b.key)) {
      return a.key > b.key ? 1 : b.key > a.key ? -1 : 0;
    }
    if (!Number.isNaN(Number(a.key)) && !Number.isNaN(Number(b.key))) {
      return Number(a.key) > Number(b.key) ? 1 : Number(b.key) > Number(a.key) ? -1 : 0;
    }
    return JSON.stringify(a.key).localeCompare(JSON.stringify(b.key));
  }

  public static sortDropdownArray(array: any[]): any[] {
    return array.sort((a, b) => {
      const aString: string = (a ? a.label : '').toLowerCase();
      const bString: string = (b ? b.label : '').toLowerCase();
      return aString.localeCompare(bString);
    });
  }

  public static sortDropdownArrayBy(array: any[], param: string): any[] {
    return array.sort((a, b) => {
      const aString: string = (a?.value?.[param] ? a.value[param] : '').toLowerCase();
      const bString: string = (b?.value?.[param] ? b.value[param] : '').toLowerCase();
      const aLabelString: string = (a ? a.label : '').toLowerCase();
      const bLabelString: string = (b ? b.label : '').toLowerCase();
      const compareResult: number = this.compareStrings(aString, bString);
      return compareResult === 0 ? this.compareStrings(aLabelString, bLabelString) : compareResult;
    });
  }

  public static compareStrings(a: string, b: string): number {
    return a.localeCompare(b);
  }
}
