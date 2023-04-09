import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

// WARNING: THIS DECORATOR DOES NOT WORK IN ANGULAR 9 WITH IVY.

/**
 * Method decorator to automatically unsubscribe in component classes.
 *
 * @example
 * ```ts
 * ngOnInit(): void {
 *  this.observable$.pipe(takeUntil((this as any).destroyed$)).subscribe();
 * }
 *
 * @ondestroy()
 * ngOnDestroy(): void {
 *  // Optionally we can do anything we want here.
 * }
 * ```
 *
 * Only 2 conditions:
 * 1) `ngOnDestroy(): void {}` must be present in the component class.
 * 2) We can only access `this.destroyed$` as `(this as any).destroyed$`.
 */
export function UnsubscribeOnDestroy(): MethodDecorator {
  /**
   * This cannot be a symbol becase we need to access it
   * in the component as `takeUntil((this as any).destroyed$)`.
   * Otherwise we would have to export the symbol itslef
   * and import it in the component class.
   */
  const destroyed$ = 'destroyed$';

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (target: Component & OnDestroy, propertyKey: string, descriptor: PropertyDescriptor) => {
    Object.defineProperty(target, destroyed$, {
      // tslint:disable-next-line: rxjs-finnish
      value: new Subject<void>(),
      // This will prevent us from creating a new destroyed$ property in the component.
      // It will throw an error if we try to do that.
      writable: false,
      enumerable: true,
      configurable: true,
    });
    const originalDescriptor = descriptor.value;

    // This cannot be an arrow function
    // So that we get the correct context of `this`.
    descriptor.value = function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      target[destroyed$].next();
      /**
       * Normally you would pass the method arguments to the function:
       * ```ts
       * originalDescriptor.apply(this, arguments);
       * ```
       * But ngOnDestroy() does not take any arguments.
       */
      originalDescriptor.apply(this);
    };
  };
}
