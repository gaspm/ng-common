export class UrlUtil {
  public static getJsonFromUrlParams(url: string): any {
    if (!url) {
      url = location.href;
    }
    const question: number = url.indexOf('?');
    let hash: number = url.indexOf('#');
    if (hash === -1 && question === -1) {
      return {};
    }
    if (hash === -1) {
      hash = url.length;
    }
    const query: string =
      question === -1 || hash === question + 1
        ? url.substring(hash)
        : url.substring(question + 1, hash);
    const result: any = {};
    query.split('&').forEach((part: string): void => {
      if (!part) {
        return;
      }
      part = part.split('+').join(' ');
      const eq: number = part.indexOf('=');
      let key: string = eq > -1 ? part.substring(0, eq) : part;
      const val: string = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
      const from: number = key.indexOf('[');
      if (from === -1) {
        result[decodeURIComponent(key)] = val;
      } else {
        const to: number = key.indexOf(']', from);
        const index: string = decodeURIComponent(key.substring(from + 1, to));
        key = decodeURIComponent(key.substring(0, from));
        if (!result[key]) {
          result[key] = [];
        }
        if (!index) {
          result[key].push(val);
        } else {
          result[key][index] = val;
        }
      }
    });
    return result;
  }
}
