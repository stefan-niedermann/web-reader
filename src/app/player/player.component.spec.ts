import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { SpeechSynthesisService } from '../speech-synthesis/speech-synthesis.service';
import { MockProvider } from 'ng-mocks'

import { NavigatorLanguage, PlayerComponent } from './player.component';
import { NgZone } from '@angular/core';
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
        MockProvider(NavigatorLanguage, 'en'),
        MockProvider(SpeechSynthesisService, { getVoices: () => EMPTY })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
