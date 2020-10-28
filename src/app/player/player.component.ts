import { Component, NgZone, OnInit } from '@angular/core';
import { SpeechSynthesisService, SpeechSynthesisUtteranceFactoryService } from '@kamiazya/ngx-speech-synthesis';
import { BehaviorSubject, merge, Subject } from 'rxjs';

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

  content = '';
  rate = 1;
  voice: string | SpeechSynthesisVoice;
  
  availableVoices: SpeechSynthesisVoice[];
  filteredVoices: BehaviorSubject<SpeechSynthesisVoice[]> = new BehaviorSubject([]);

  constructor(
    private speechSynthesis: SpeechSynthesisService,
    private utteranceFactory: SpeechSynthesisUtteranceFactoryService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // https://github.com/kamiazya/ngx-speech-synthesis/issues/549
    this.availableVoices = this.speechSynthesis.getVoices();
    console.log('available voices:', this.availableVoices);

    this.voice = this.availableVoices.find((voice) => voice.lang === 'de');
    console.log('found default voice:', this.voice);
    this.utteranceFactory.voice = this.voice;

    this.playPressed$.subscribe(() => {
      if (this.speechSynthesis.speaking) {
        this.stopPressed$.next();
      }
      // https://github.com/kamiazya/ngx-speech-synthesis/issues/550
      this.utteranceFactory.onend = (a) => {
        this.runningUtterancesCount--;
        if (this.runningUtterancesCount === 0) {
          this.ngZone.run(() => this.allRunningUtterancesFinished$.next())
        }
      }
      this.speechSynthesis.speak(this.utteranceFactory.text(this.content));
      this.runningUtterancesCount++;
      this.stopButtonDisabled$.next(false);
    });

    this.stopPressed$.subscribe(() => {
      this.speechSynthesis.cancel();
    });

    merge(
      this.stopPressed$,
      this.allRunningUtterancesFinished$
    ).subscribe(() => this.stopButtonDisabled$.next(true));
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

  updateVoice(searchInput: string | SpeechSynthesisVoice) {
      if ((searchInput as SpeechSynthesisVoice).lang) {
        this.utteranceFactory.voice = searchInput as SpeechSynthesisVoice;
      }
      const filterValue = searchInput ? (searchInput instanceof SpeechSynthesisVoice) ? searchInput.name.toLowerCase() : searchInput.toLowerCase() : '';
      this.filteredVoices.next(this.availableVoices.filter(option => option && option.name ? option.name.toLowerCase().indexOf(filterValue) >= 0 : false));
  }

  updateRate(next) {
    this.utteranceFactory.rate = Math.round(next);
  }
}
