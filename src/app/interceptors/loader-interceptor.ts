import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MessageQueueService} from '../services/message-queue.service';

/**
 * An interceptor that monitors http requests and notifies if the request starts or ends.
 * Ignores queries with the silent header, monitors the currently open number of queries
 * and only if it drops to zero, it notifies about the end...
 */
@Injectable({providedIn: 'root'})
export class LoaderInterceptor implements HttpInterceptor {
  /**
   * Counter, with which I count currently active queries so that I know that if it is equal to 0, I should send STOP to BlockUI
   */
  requestCount = 0;

  constructor(private messageQueueService: MessageQueueService<boolean>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const silentHeaderPresent: boolean = request.headers.has('silent');

    let requestToSend: HttpRequest<any> = request;
    if (silentHeaderPresent) {
      requestToSend = request.clone({headers: request.headers.delete('silent')});
    } else {
      this.requestCount++;
      this.messageQueueService.subject('loader-backdrop').next(true);
    }

    return next.handle(requestToSend).pipe(
      tap({
        next: this.handleResponse.bind(this, silentHeaderPresent),
        error: this.handleResponse.bind(this, silentHeaderPresent),
      }),
    );
  }

  /**
   * Processing the response from the server
   */
  handleResponse(silent: boolean, eventData: any): void {
    if (eventData instanceof HttpResponseBase && !silent) {
      if (this.requestCount > 0) {
        this.requestCount--;
      }

      if (this.requestCount === 0) {
        this.messageQueueService.subject('loader-backdrop').next(false);
      }
    }
  }
}

export const createLoaderBackdropService = (
  messageQueueService: MessageQueueService<boolean>,
): LoaderInterceptor => new LoaderInterceptor(messageQueueService);
