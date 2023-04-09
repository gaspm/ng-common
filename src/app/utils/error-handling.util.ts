export class ErrorHandlingUtil {
  static localizedErrors: number[] = [400, 401, 403, 404, 406, 413, 500, 503, 504];

  public static getErrorMessage(errorCode: number): string {
    if (this.localizedErrors.indexOf(errorCode) >= 0) {
      return 'error_status_' + errorCode;
    }
    return 'error_unknown';
  }
}
