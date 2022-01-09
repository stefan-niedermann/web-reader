import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SpeechSynthesisService } from '../speech-synthesis/speech-synthesis.service';
import { MockProvider } from 'ng-mocks'

import { NavigatorLanguage, PlayerComponent } from './player.component';
import { EMPTY } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';

xdescribe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatIconModule,
        MatSliderModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatTooltipModule
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
