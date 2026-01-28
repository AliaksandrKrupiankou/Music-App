import { TestBed } from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';
import { provideHttpClient } from '@angular/common/http';

describe('FileUploadService', () => {
  let service: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
      ]
    });
    service = TestBed.inject(FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
