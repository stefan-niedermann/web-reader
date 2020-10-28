import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpeechSynthesisModule } from '@kamiazya/ngx-speech-synthesis';
import { FormsModule } from '@angular/forms';
import { LicensesComponent } from './licenses/licenses.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    LicensesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    SpeechSynthesisModule.forRoot({
      lang: 'en',
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
