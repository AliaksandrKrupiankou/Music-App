import { TestBed } from '@angular/core/testing';

import { FavoriteService } from './favorite-service';
import { Firestore } from '@angular/fire/firestore';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [

      ]
    });
    service = TestBed.inject(FavoriteService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
