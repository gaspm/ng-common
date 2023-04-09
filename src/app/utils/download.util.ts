import {MimeType} from '../enums/mime-type.enum';

export class DownloadUtil {
  public static downloadDocument(
    data: Blob,
    filename: string,
    type: MimeType = MimeType.BIN,
  ): void {
    const blob: Blob = new Blob([data], {type});
    const url: string = window.URL.createObjectURL(blob);
    const link: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );

    setTimeout(() => {
      window.URL.revokeObjectURL(link.href);
      link.remove();
    }, 1000);
  }
}
