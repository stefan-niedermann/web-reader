import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { LicensesService } from '../licenses/licenses.service';
import { MaterialModule } from '../material.module';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [AboutComponent],
      providers: [
        MockProvider(LicensesService, { getLicenses: () => EMPTY})
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch license informations in ngOnInit() callback', () => {
    const licensesService = TestBed.inject(LicensesService);
    jest.spyOn(licensesService, 'getLicenses');
    component.ngOnInit();
    expect(licensesService.getLicenses).toHaveBeenCalledTimes(1);
  });
});
