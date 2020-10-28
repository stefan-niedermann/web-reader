import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisService {

  constructor(
    private _window: Window
  ) { }

  /**
   * A wrapper to get the same behavior on different browsers.
   * 
   * https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/onvoiceschanged#Examples
   */
  public getVoices(): Observable<SpeechSynthesisVoice[]> {
    const result = new BehaviorSubject<SpeechSynthesisVoice[]>([]);
    const pushVoices = () => result.next(this._window.speechSynthesis.getVoices());
    pushVoices();
    if (this._window.speechSynthesis.onvoiceschanged !== undefined) {
      this._window.speechSynthesis.onvoiceschanged = pushVoices;
    }
    return result.asObservable();
  }

  public speak(utterance: SpeechSynthesisUtterance) {
    this._window.speechSynthesis.speak(utterance);
  }

  public cancel() {
    this._window.speechSynthesis.cancel();
  }

  public get speaking(): boolean {
    return this._window.speechSynthesis.speaking;
  }
}