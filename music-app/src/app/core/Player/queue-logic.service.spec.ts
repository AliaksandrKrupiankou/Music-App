import { TestBed } from '@angular/core/testing';

import { QueueLogicService } from './queue-logic.service';

describe('QueueLogicService', () => {
  let service: QueueLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueueLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
