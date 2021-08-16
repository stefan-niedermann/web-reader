import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MockProvider } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { LicensesService } from '../licenses/licenses.service';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule
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
