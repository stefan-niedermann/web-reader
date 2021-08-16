import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigatorLanguage, PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AboutComponent } from './about/about.component';
import { GeneratedLicenseFileAvailable } from './licenses/licenses.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    { provide: Window, useValue: window },
    { provide: GeneratedLicenseFileAvailable, useValue: environment.production },
    { provide: NavigatorLanguage, useValue: window.navigator.language }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
