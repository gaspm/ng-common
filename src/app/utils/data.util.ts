export class DataUtil {
  /**
   * Escapes and creates a JSON string
   */
  public static escapeAndStringifyJson(json: any): string {
    const jsonString = JSON.stringify(json);
    const escapedJSONString = jsonString
      .replace(/\\n/g, '\\n')
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, '\\&')
      .replace(/\\r/g, '\\r')
      .replace(/\\t/g, '\\t')
      .replace(/\\b/g, '\\b')
      .replace(/\\f/g, '\\f');
    return escapedJSONString;
  }

  /**
   * Generates a random String to Input name FIX (History of offered entries)
   */
  public static generateInputName(length = 5): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
