import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, Subject } from 'rxjs';

@Injectable()
export class SpeechSynthesisMockService {

  public getVoices(): Observable<SpeechSynthesisVoice[]> {
    return EMPTY;
  }

  public speak(utterance: SpeechSynthesisUtterance) {
    // NoOp
  }

  public cancel() {
    // NoOp
  }
}