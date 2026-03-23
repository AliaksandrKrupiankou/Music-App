import { TestBed } from '@angular/core/testing';

import { PlayerUiService } from './player-ui.service';

describe('PlayerUiService', () => {
  let service: PlayerUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
