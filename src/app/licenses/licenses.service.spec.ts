import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LicensesService } from './licenses.service';

describe('LicensesService', () => {
  let service: LicensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LicensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
