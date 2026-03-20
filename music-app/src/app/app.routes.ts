import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout-component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'collection',
        loadComponent: () =>
          import('./pages/collection-page/collection-page').then((m) => m.CollectionPage),
      },
      {
        path: '',
        loadComponent: () => import('./pages/search-page/search-page').then((m) => m.SearchPage),
      },
      {
        path: 'main',
        loadComponent: () => import('./pages/main-page/main-page').then((m) => m.MainPage),
      },
      {
        path: 'artist/:artistId',
        loadComponent: () => import('./pages/artist-page/artist-page').then((m) => m.ArtistPage),
      },
      {
        path: 'artist/:artistId/tracks',
        loadComponent: () =>
          import('./pages/artist-tracks/artist-tracks.component').then(
            (m) => m.ArtistTracksComponent,
          ),
      },
      {
        path: 'albums/:albumId',
        loadComponent: () => import('./pages/album-page/album-page').then((m) => m.AlbumPage),
      },
      {
        path: 'playlist/:playlistId',
        loadComponent: () =>
          import('./pages/playlist-page/playlist-page.component').then(
            (m) => m.PlaylistPageComponent,
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
    canActivate: [loginGuard],
  },
];
