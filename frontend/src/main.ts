import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import {routes} from './app/app.routes';
import {provideRouter} from '@angular/router';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),provideHttpClient(), // pour HttpClient dans TaskService
  ],
})
  .then(() => console.log('Angular 20 app running!'))
  .catch(err => console.error(err));



// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';
//
// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));
