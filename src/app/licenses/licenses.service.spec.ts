import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GeneratedLicenseFileAvailable, LicensesService } from './licenses.service';

describe('LicensesService', () => {
  let service: LicensesService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LicensesService,
        { provide: GeneratedLicenseFileAvailable, useValue: true }
      ]
    });
    service = TestBed.inject(LicensesService);
    testingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    testingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sanitize the HTTP response', (done) => {
    // Write console.warn() into variable instead of real logging
    let logMessage;
    const originalConsoleWarn = console.warn;
    console.warn = (msg) => logMessage = msg;
    service.getLicenses().subscribe(response => {
      expect(response).not.toContain('script');
      expect(logMessage).toContain('sanitizing HTML stripped some content');
      console.warn = originalConsoleWarn;
      done();
    });
    testingController.expectOne('3rdpartylicenses.txt').flush(
      `<h1>Test</h1><script type="text/javascript">alert('Hallo Welt');</script>`
    );
  })

  it('should replace \n with HTML <br> tags', () => {
    service.getLicenses().subscribe(response => expect(response).toContain('<br>'));
    testingController.expectOne('3rdpartylicenses.txt').flush(
      `First line
      Second line`
    );
  })
});
