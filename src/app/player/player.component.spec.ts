import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { SpeechSynthesisMockService } from '../speech-synthesis/speech-synthesis.service.mock';
import { SpeechSynthesisService } from '../speech-synthesis/speech-synthesis.service';

import { PlayerComponent } from './player.component';

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
        { provide: SpeechSynthesisService, useClass: SpeechSynthesisMockService },
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
