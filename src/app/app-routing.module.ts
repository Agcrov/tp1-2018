import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WildcardDashboardComponent} from './wildcard-dashboard/wildcard-dashboard.component';
import {MovieDetailComponent} from './movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: WildcardDashboardComponent },
  { path: 'movie/:id/:name', component: MovieDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
