const normalizeMap: Record<string, string> = {
  á: 'a',
  ä: 'a',
  ľ: 'l',
  ĺ: 'l',
  ś: 's',
  š: 's',
  č: 'c',
  ť: 't',
  ž: 'z',
  ź: 'z',
  ý: 'y',
  é: 'e',
  ě: 'e',
  í: 'i',
  ú: 'u',
  ó: 'o',
  ô: 'o',
  ř: 'r',
  ŕ: 'r',
  ň: 'n',
  ń: 'n',
  ď: 'd',
};

export class StringUtils {
  static normalize(value: string): string {
    return value ? StringUtils.replaceSpecialChars(value.toLowerCase()) : '';
  }

  static contain(value: string, query: string): boolean {
    return (
      StringUtils.normalize(StringUtils.normalize(value)).indexOf(StringUtils.normalize(query)) >= 0
    );
  }

  private static replaceSpecialChars(result: string): string {
    for (const [key, value] of Object.entries(normalizeMap)) {
      result = result.replace(new RegExp(key), value);
    }

    return result;
  }
}
