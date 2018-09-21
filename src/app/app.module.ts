import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MovieWildcardComponent } from './movie-wildcard/movie-wildcard.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { WildcardDashboardComponent } from './wildcard-dashboard/wildcard-dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AccordionComponent } from './movie-detail/accordion/accordion.component';
import { CastViewerComponent } from './movie-detail/cast-viewer/cast-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieWildcardComponent,
    MovieSearchComponent,
    WildcardDashboardComponent,
    MessagesComponent,
    MovieDetailComponent,
    AccordionComponent,
    CastViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
