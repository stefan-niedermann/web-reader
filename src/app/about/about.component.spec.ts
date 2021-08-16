import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicensesService } from '../licenses/licenses.service';
import { LicensesServiceMock } from '../licenses/licenses.service.mock';
import { MaterialModule } from '../material.module';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let licenseService: LicensesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [AboutComponent],
      providers: [
        { provide: LicensesService, useClass: LicensesServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    licenseService = TestBed.inject(LicensesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch license informations in ngOnInit() callback', () => {
    jest.spyOn(licenseService, 'getLicenses');
    component.ngOnInit();
    expect(licenseService.getLicenses).toHaveBeenCalledTimes(1);
  });
});
