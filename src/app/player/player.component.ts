import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpeechSynthesisService, SpeechSynthesisUtteranceFactoryService } from '@kamiazya/ngx-speech-synthesis';
import { BehaviorSubject, merge, Observable, Subject, zip } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  runningUtterancesCount = 0;

  playPressed$ = new Subject();
  stopPressed$ = new Subject();
  allRunningUtterancesFinished$ = new Subject();

  settingsVisible$ = new BehaviorSubject(false);
  stopButtonDisabled$ = new BehaviorSubject(true);

  rateControl = new FormControl(1);
  contentControl = new FormControl();
  voiceControl = new FormControl();
  filteredVoices: Observable<SpeechSynthesisVoice[]>;

  constructor(
    private speechSynthesis: SpeechSynthesisService,
    private utteranceFactory: SpeechSynthesisUtteranceFactoryService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    const voices = this.speechSynthesis.getVoices();

    this.voiceControl.setValue(voices.find((voice) => voice.lang === 'de'));
    this.utteranceFactory.voice = this.voiceControl.value;
    this.rateControl.valueChanges.subscribe((next) => {
      this.utteranceFactory.rate = Math.round(next);
    });
    this.filteredVoices = this.voiceControl.valueChanges.pipe(
      startWith(''),
      map((searchInput: string | SpeechSynthesisVoice) => {
        if ((searchInput as SpeechSynthesisVoice).lang) {
          this.utteranceFactory.voice = searchInput as SpeechSynthesisVoice;
        }
        const filterValue = searchInput ? (searchInput instanceof SpeechSynthesisVoice) ? searchInput.name.toLowerCase() : searchInput.toLowerCase() : '';
        return voices.filter(option => option && option.name ? option.name.toLowerCase().indexOf(filterValue) >= 0 : false);
      })
    );

    merge(
      this.stopPressed$,
      this.allRunningUtterancesFinished$
    ).subscribe(() => this.stopButtonDisabled$.next(true));

    this.playPressed$.subscribe(() => {
      if (this.speechSynthesis.speaking) {
        this.stopPressed$.next();
      }
      // TODO report ngZone issue upstream (https://www.educative.io/edpresso/change-detection-getting-in-the-angular-zone)
      this.utteranceFactory.onend = (a) => {
        this.runningUtterancesCount--;
        if (this.runningUtterancesCount === 0) {
          this.ngZone.run(() => this.allRunningUtterancesFinished$.next())
        }
      }
      this.speechSynthesis.speak(this.utteranceFactory.text(this.contentControl.value));
      this.runningUtterancesCount++;
      this.stopButtonDisabled$.next(false);
    });

    this.stopPressed$.subscribe(() => {
      this.speechSynthesis.cancel();
    });
  }

  displayFn(voice: SpeechSynthesisVoice): string {
    return voice && voice.name ? voice.name : '';
  }

  speak() {
    this.playPressed$.next();
  }

  stop() {
    this.stopPressed$.next();
  }

  formatRate(rate: number) {
    return `${Math.round(rate * 10) / 10}x`;
  }

  toggleSettings() {
    this.settingsVisible$.next(!this.settingsVisible$.getValue());
  }
}
