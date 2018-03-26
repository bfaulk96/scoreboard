import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '',
    component: HomeComponent
  },
  { path: 'new',
    component: HomeComponent,
    data: {action: 'reset'}
  },
  { path: 'red/:num',
    component: HomeComponent,
    data: {action: 'setRed'}
  },
  { path: 'blue/:num',
    component: HomeComponent,
    data: {action: 'setBlue'}
  },
  { path: 'increment-blue',
    component: HomeComponent,
    data: {action: 'incrementBlue'}
  },
  { path: 'increment-blue/:num',
    component: HomeComponent,
    data: {action: 'incrementBlue'}
  },
  { path: 'increment-red',
    component: HomeComponent,
    data: {action: 'incrementRed'}
  },
  { path: 'increment-red/:num',
    component: HomeComponent,
    data: {action: 'incrementRed'}
  },
  { path: 'reset',
    component: HomeComponent,
    data: {action: 'reset'}
  },
  { path: '**',
    redirectTo: '/',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [{ provide: 'LOCALSTORAGE', useFactory: getLocalStorage }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}
