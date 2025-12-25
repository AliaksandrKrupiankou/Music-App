import { TestBed } from '@angular/core/testing';

import { SearchSongService } from './search-song-service';

describe('SearchSongService', () => {
  let service: SearchSongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchSongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
