import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

export enum Statuses {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
}

export type RequestStatus = Statuses | { error: string };
export type RequestStatusState = { requestStatus: RequestStatus };

export function withRequestStatus() {
  return signalStoreFeature(
    withState<RequestStatusState>({ requestStatus: Statuses.Idle }),
    withComputed(({ requestStatus }) => ({
      isPending: computed(() => requestStatus() === Statuses.Pending),
      isFulfilled: computed(() => requestStatus() === Statuses.Fulfilled),
      error: computed(() => {
        const status = requestStatus();
        return typeof status === 'object' ? status.error : null;
      }),
    })),
  );
}

export function setPending(): RequestStatusState {
  return { requestStatus: Statuses.Pending };
}

export function setFulfilled(): RequestStatusState {
  return { requestStatus: Statuses.Fulfilled };
}

export function setError(error: string): RequestStatusState {
  return { requestStatus: { error } };
}
