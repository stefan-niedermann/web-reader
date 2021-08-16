import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { SpeechSynthesisService } from '../speech-synthesis/speech-synthesis.service';
import { MockProvider } from 'ng-mocks'

import { PlayerComponent } from './player.component';
import { NgZone } from '@angular/core';
import { LicensesService } from '../licenses/licenses.service';
import { EMPTY } from 'rxjs';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule
      ],
      declarations: [PlayerComponent],
      providers: [
        { provide: Navigator, useValue: { language: 'en' } },
        MockProvider(SpeechSynthesisService, {
          getVoices: () => EMPTY
        }),
        MockProvider(NgZone),
        MockProvider(LicensesService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
