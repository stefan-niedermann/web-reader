import { Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SpeechSynthesisService } from '../speech-synthesis/speech-synthesis.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$ = new Subject<void>();

  runningUtterancesCount = 0;

  playPressed$ = new Subject<void>();
  stopPressed$ = new Subject<void>();
  allRunningUtterancesFinished$ = new Subject<void>();

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
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(next => this.availableVoices = next)
      )
      .subscribe(() => {
        this.voice = this.availableVoices.find((voice) => voice.lang === this.navigator.language);
        this.currentVoice = this.voice;
      });

    this.playPressed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
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

    this.stopPressed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.speechSynthesis.cancel();
      });

    merge(
      this.stopPressed$,
      this.allRunningUtterancesFinished$
    )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.stopButtonDisabled$.next(true));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener("keydown.control.enter", ['$event'])
  speak() {
    this.playPressed$.next();
  }

  @HostListener("keydown.escape", ['$event'])
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
