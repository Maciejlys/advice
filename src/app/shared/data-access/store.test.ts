import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
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
    store = new AdviceStore(HttpClientTestingModule);
  });

  it('should get random advice successfully', () => {
    // const mockSlip: Slip = {
    //   slip: { id: 1, advice: 'Test advice' },
    // };
    //
    // const req = httpController.expectOne(apiUrl);
    // expect(req.request.method).toEqual('GET');
    // req.flush(mockSlip);
    // store.getRandomAdvice();
    //
    // expect(store.id()).toEqual(mockSlip.slip.id);
  });
});
