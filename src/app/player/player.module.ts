import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigatorLanguage, PlayerComponent } from './player.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayerComponent
      }
    ])
  ],
  providers: [
    { provide: NavigatorLanguage, useValue: window.navigator.language }
  ]
})
export class PlayerModule { }
