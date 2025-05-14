import { TestBed } from '@angular/core/testing';

import { PicService } from './pic.service';

describe('PicService', () => {
  let service: PicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
