import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

@Injectable()
export class LicensesServiceMock {

  public getLicenses() {
    return EMPTY;
  }
}
