import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SpeechSynthesisModule } from '@kamiazya/ngx-speech-synthesis';
import { MaterialModule } from '../material.module';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule,
        SpeechSynthesisModule.forRoot({
          lang: 'en',
          volume: 1.0,
          pitch: 1.0,
          rate: 1.0,
        }),
      ],
      declarations: [PlayerComponent]
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
