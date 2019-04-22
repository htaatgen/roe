import { TestBed, inject } from '@angular/core/testing';

import { BakeService } from './bake.service';

describe('BakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BakeService]
    });
  });

  it('should be created', inject([BakeService], (service: BakeService) => {
    expect(service).toBeTruthy();
  }));
});
