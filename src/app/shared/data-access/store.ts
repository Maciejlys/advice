import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Advice, Slip } from '../model';
import { apiUrl } from '../constants';
import { computed, inject } from '@angular/core';
import {
  withRequestStatus,
  setError,
  setPending,
  setFulfilled,
} from './with-request-status';

export const AdviceStore = signalStore(
  { providedIn: 'root' },
  withState<Advice>({
    id: 117,
    advice:
      'some very long advice that is in qoutes for testing this shit lets see',
  }),
  withRequestStatus(),
  withComputed((store) => ({
    quotedAdvice: computed(() => `"${store.advice()}"`),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    getRandomAdvice() {
      patchState(store, setPending());
      http
        .get<Slip>(apiUrl)
        .pipe(
          catchError((err: Error) => {
            patchState(store, setError(err.message));
            return of<Slip>({ slip: { id: undefined, advice: undefined } });
          }),
          tap((res) => {
            patchState(store, { id: res.slip.id, advice: res.slip.advice });
            patchState(store, setFulfilled());
          }),
        )
        .subscribe();
    },
  })),
  withHooks({
    onInit(store) {
      store.getRandomAdvice();
    },
  }),
);
