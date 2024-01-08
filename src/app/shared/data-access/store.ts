import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { EMPTY, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    id: undefined,
    advice: undefined,
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
          tap((res) => {
            patchState(store, { id: res.slip.id, advice: res.slip.advice });
            patchState(store, setFulfilled());
          }),
          catchError((err: HttpErrorResponse) => {
            patchState(store, setError(err.error));
            return of(EMPTY);
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
