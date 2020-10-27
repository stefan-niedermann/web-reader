import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicensesComponent } from './licenses/licenses.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerComponent
  },
  {
    path: 'licenses',
    component: LicensesComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
