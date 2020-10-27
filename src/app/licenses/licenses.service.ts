import { HttpClient } from '@angular/common/http';
import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {

  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) { }

  public getLicenses() {
    return environment.production ?
      this.http
        .get('3rdpartylicenses.txt', { responseType: 'text' })
        .pipe(
          map(licenses => this.sanitizer.sanitize(SecurityContext.HTML, licenses.replace(/(?:\r\n|\r|\n)/g, '<br />')))
        )
      : of('License information is only available in production mode.');
  }
}
