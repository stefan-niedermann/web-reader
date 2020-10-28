import { TestBed } from '@angular/core/testing';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';

import { SpeechSynthesisService } from './speech-synthesis.service';

describe('SpeechSynthesisService', () => {
  let service: SpeechSynthesisService;
  let _window;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Window, useValue: {
            speechSynthesis: {
              getVoices: () => [],
              speak: () => { },
              cancel: () => { },
              speaking: false,
            }
          }
        }
      ]
    });
    service = TestBed.inject(SpeechSynthesisService);
    _window = TestBed.inject(Window);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pass an utterance through to the SpeechSynthesis object', () => {
    spyOn(_window.speechSynthesis, 'speak').and.callThrough();
    const utterance = new SpeechSynthesisUtterance('abc');
    service.speak(utterance);
    expect(_window.speechSynthesis.speak).toHaveBeenCalledWith(utterance);
  });

  it('should pass through a request to cancel the speech to the SpeechSynthesis object', () => {
    spyOn(_window.speechSynthesis, 'cancel').and.callThrough();
    service.cancel();
    expect(_window.speechSynthesis.cancel).toHaveBeenCalledTimes(1);
  });

  it('should correctly return the value of the speaking property of the SpeechSynthesis object', () => {
    const originalSpeakingValue = _window.speechSynthesis.speaking;
    _window.speechSynthesis.speaking = false;
    expect(service.speaking).toBe(false);
    _window.speechSynthesis.speaking = true;
    expect(service.speaking).toBe(true);
    _window.speechSynthesis.speaking = originalSpeakingValue;
  });

  it('should fetch voices directly and again if the onvoiceschanged callback is available and fired', (done) => {
    _window.speechSynthesis.onvoiceschanged = {};
    spyOn(_window.speechSynthesis, 'getVoices').and.callThrough();
    let counter = 0;
    service.getVoices().subscribe(() => {
      counter++;
      if (counter === 1) {
        expect(typeof _window.speechSynthesis.onvoiceschanged).toEqual('function');
        _window.speechSynthesis.onvoiceschanged();
      } else if (counter === 2) {
        expect(_window.speechSynthesis.getVoices).toHaveBeenCalledTimes(2);
        done();
      } else if (counter > 2) {
        fail();
      }
    });
  });

  it('should fetch voices of the SpeechSynthesis object directly if there is no onvoiceschanged callback', (done) => {
    _window.speechSynthesis.onvoiceschanged = undefined;
    spyOn(_window.speechSynthesis, 'getVoices').and.callThrough();
    service.getVoices().subscribe(() => {
      expect(_window.speechSynthesis.getVoices).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
