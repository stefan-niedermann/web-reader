import { Component, NgZone, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpeechSynthesisService } from '../speech-synthesis/speech-synthesis.service';

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
  
  availableVoices: SpeechSynthesisVoice[] = [];
  filteredVoices: BehaviorSubject<SpeechSynthesisVoice[]> = new BehaviorSubject([]);
  currentVoice: SpeechSynthesisVoice;

  constructor(
    private speechSynthesis: SpeechSynthesisService,
    private ngZone: NgZone,
    private navigator: Navigator
  ) { }

  ngOnInit(): void {
    this.speechSynthesis.getVoices()
    .pipe(tap(next => this.availableVoices = next))
    .subscribe(next => {
      this.voice = this.availableVoices.find((voice) => voice.lang === this.navigator.language);
      this.currentVoice = this.voice;
    });

    this.playPressed$.subscribe(() => {
      if (this.speechSynthesis.speaking) {
        this.stopPressed$.next();
      }
      const utterance = new SpeechSynthesisUtterance(this.content);
      utterance.voice = this.currentVoice;
      utterance.rate = this.rate;
      utterance.onend = () => {
        this.runningUtterancesCount--;
        if (this.runningUtterancesCount === 0) {
          this.ngZone.run(() => this.allRunningUtterancesFinished$.next())
        }
      }
      this.speechSynthesis.speak(utterance);
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

  speak() {
    this.playPressed$.next();
  }

  stop() {
    this.stopPressed$.next();
  }

  toggleSettings() {
    this.settingsVisible$.next(!this.settingsVisible$.getValue());
  }

  updateVoice(searchInput: string | SpeechSynthesisVoice) {
      if ((searchInput as SpeechSynthesisVoice).lang) {
        this.currentVoice = searchInput as SpeechSynthesisVoice;
      }
      const filterValue = searchInput ? (searchInput instanceof SpeechSynthesisVoice) ? searchInput.name.toLowerCase() : searchInput.toLowerCase() : '';
      this.filteredVoices.next(this.availableVoices.filter(option => option && option.name ? option.name.toLowerCase().indexOf(filterValue) >= 0 : false));
  }

  formatRate(rate: number) {
    return `${Math.round(rate * 10) / 10}x`;
  }

  displayVoice(voice: SpeechSynthesisVoice): string {
    return voice && voice.name ? voice.name : '';
  }
}
