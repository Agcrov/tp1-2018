import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {SatPopoverModule} from "@ncstate/sat-popover";

import { AppComponent } from './app.component';
import { MovieWildcardComponent } from './movie-wildcard/movie-wildcard.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { WildcardDashboardComponent } from './wildcard-dashboard/wildcard-dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AccordionComponent } from './movie-detail/accordion/accordion.component';
import { CastViewerComponent } from './movie-detail/cast-viewer/cast-viewer.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieWildcardComponent,
    MovieSearchComponent,
    WildcardDashboardComponent,
    MessagesComponent,
    MovieDetailComponent,
    AccordionComponent,
    CastViewerComponent,
    TabsComponent,
    TabComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgCircleProgressModule.forRoot({
      backgroundColor: '#4e4e4e',
      radius: 38,
      unitsFontSize: '12',
      maxPercent: 100,
      unitsColor: '#e0e0e0',
      outerStrokeColor: '#ffef00',
      innerStrokeColor: '#a9a9a9',
      outerStrokeWidth: 4,
      innerStrokeWidth: 2,
      titleColor: '#e0e0e0'
    }),
    SatPopoverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
