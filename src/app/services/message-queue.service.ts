import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {MessageQueueSubject} from '../others/message-queue.subject';

@Injectable({providedIn: 'root'})
export class MessageQueueService<T> {
  protected subjects: MessageQueueSubject<T>[] = [];
  protected channelBus: ReplaySubject<any> = new ReplaySubject<any>();

  constructor() {
    // Modification of the functionality of the observable, which prevents it from terminating itself.
    // Remnant from "hacking" the `complete` methods, which will lose the original functionality
    // and the `error` method, which will only dispatch an error to all observers.
    this.channelBus.complete = () => {
      // empty
    };
    this.channelBus.error = error =>
      this.channelBus.asObservable().forEach(os => {
        os.error(error);
        os.closed = false;
      });
  }

  subject(topic: string): MessageQueueSubject<T> {
    let sub: MessageQueueSubject<T> | null = null;
    sub = this.subjects.filter(s => s.topic === topic)[0];

    if (!sub) {
      sub = new MessageQueueSubject();
      sub.topic = topic;

      this.subjects.push(sub);
      this.channelBus.next(sub);
    }
    return sub;
  }
}
