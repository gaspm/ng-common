export interface LangConstant {
  name: string;
  code: string;
}

export const enum LangEnum {
  EN = 'en',
  SK = 'sk',
}

export const lang: LangConstant[] = [
  {
    name: 'English',
    code: LangEnum.EN,
  },
  {
    name: 'Slovenčina',
    code: LangEnum.SK,
  },
];
