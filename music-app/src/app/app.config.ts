import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import {
  LucideAngularModule,
  Search,
  Music,
  BookHeart,
  Play,
  Pause,
  Heart,
  SkipBack,
  SkipForward,
  VolumeX,
  Volume2,
  Volume1,
  UserRound,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    importProvidersFrom(
      LucideAngularModule.pick({
        Search,
        Music,
        BookHeart,
        Play,
        Pause,
        Heart,
        SkipBack,
        SkipForward,
        Volume1,
        Volume2,
        VolumeX,
        UserRound,
      })
    ),
  ],
};
