import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { icons } from './icons.config';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    provideTranslateService({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    importProvidersFrom(LucideAngularModule.pick(icons)),
  ],
};
