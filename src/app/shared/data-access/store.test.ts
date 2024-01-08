import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AdviceStore } from './store';
import { Slip } from '../model';
import { apiUrl } from '../constants';

describe('AdviceStore', () => {
  let store: InstanceType<typeof AdviceStore>;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdviceStore],
    }).compileComponents();

    httpController = TestBed.inject(HttpTestingController);
    store = TestBed.inject(AdviceStore);
  });

  it('should get random advice successfully', fakeAsync(() => {
    const mockSlip: Slip = {
      slip: { id: 1, advice: 'Test advice' },
    };

    expect(store.id()).toBeUndefined();
    expect(store.advice()).toBeUndefined();

    const req = httpController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(mockSlip);
    tick(1000);

    expect(store.id()).toEqual(mockSlip.slip.id);
    expect(store.advice()).toEqual(mockSlip.slip.advice);
    expect(store.quotedAdvice()).toEqual(`"${mockSlip.slip.advice}"`);
    httpController.verify();
  }));

  it('should set an error msg when error occurs', () => {
    const emsg = 'deliberate 404 error';

    expect(store.id()).toBeUndefined();
    expect(store.advice()).toBeUndefined();

    const req = httpController.expectOne(apiUrl);

    req.flush(emsg, { status: 404, statusText: 'Not Found' });

    expect(store.error()).toEqual(emsg);
  });
});
