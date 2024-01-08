import { patchState, signalStore } from '@ngrx/signals';
import {
  Statuses,
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from './with-request-status';

describe('withRequestStatus', () => {
  it('should extend the original store', () => {
    const Store = signalStore(withRequestStatus());
    const store = new Store();

    expect(store.requestStatus()).toEqual(Statuses.Idle);
  });

  it('setError should set error', () => {
    const Store = signalStore(withRequestStatus());
    const store = new Store();

    expect(store.error()).toBeFalsy();
    patchState(store, setError('error'));
    expect(store.error()).toEqual('error');
  });

  it('setFulfilled should set fulfilled to true', () => {
    const Store = signalStore(withRequestStatus());
    const store = new Store();

    expect(store.requestStatus()).toEqual(Statuses.Idle);
    expect(store.isFulfilled()).toBeFalsy();
    patchState(store, setFulfilled());
    expect(store.requestStatus()).toEqual(Statuses.Fulfilled);
    expect(store.isFulfilled()).toBeTruthy();
  });

  it('setPending should set pending to true', () => {
    const Store = signalStore(withRequestStatus());
    const store = new Store();

    expect(store.requestStatus()).toEqual(Statuses.Idle);
    expect(store.isPending()).toBeFalsy();
    patchState(store, setPending());
    expect(store.requestStatus()).toEqual(Statuses.Pending);
    expect(store.isPending()).toBeTruthy();
  });
});
