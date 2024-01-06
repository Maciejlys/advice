import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Advice, Slip } from '../model';
import { apiUrl } from '../constants';
import { inject } from '@angular/core';

export const AdviceStore = signalStore(
  { providedIn: 'root' },
  withState<Advice>({
    id: undefined,
    advice: undefined,
  }),
  withMethods((store, http = inject(HttpClient)) => ({
    getRandomAdvice() {
      http
        .get<Slip>(apiUrl)
        .pipe(
          catchError(() =>
            of<Slip>({ slip: { id: undefined, advice: undefined } }),
          ),
          tap((res) =>
            patchState(store, { id: res.slip.id, advice: res.slip.advice }),
          ),
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
