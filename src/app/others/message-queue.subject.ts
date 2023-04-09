import {Subject} from 'rxjs';

// Modification of the Subject functionality, which prevents it from terminating itself.
// Remnant from "hacking" the `complete` methods, which will lose the original functionality
// and the `error` method, which will only dispatch an error to all observers.
export class MessageQueueSubject<T> extends Subject<T> {
  public topic = '';

  public override complete(): void {
    // empty
  }
  public override error(err: any): void {
    this.thrownError = err;
    this.observers.forEach((os: any) => {
      os.destination._error.call(os.destination._context, err);
    });
  }
}
