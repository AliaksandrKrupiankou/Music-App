import { TestBed } from '@angular/core/testing';

import { ImageColorServiceService } from './image-color-service.service';

describe('ImageColorServiceService', () => {
  let service: ImageColorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageColorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
