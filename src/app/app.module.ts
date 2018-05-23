import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from "@angular/common/http";
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import {ConfigService} from "./config.service";
import { DatePipe } from '@angular/common';


const appRoutes: Routes = [
  { path: '',
    component: HomeComponent
  },
  {
    path: 'game/:code',
    component: ScoreboardComponent
  },
  { path: '**',
    redirectTo: '/',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScoreboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    DatePipe,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}
