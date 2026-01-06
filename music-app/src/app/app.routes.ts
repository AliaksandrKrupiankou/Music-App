import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout-component';
import { PlaylistPage } from './pages/playlist-page/playlist-page';
import { SearchPage } from './pages/search-page/search-page';
import { MainPage } from './pages/main-page/main-page';
import { ArtistPage } from './pages/artist-page/artist-page';
import { AlbumPage } from './pages/album-page/album-page';
import { LoginPage } from './pages/login-page/login-page';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'playlist',
        component: PlaylistPage,
      },
      {
        path: '',
        component: SearchPage,
      },
      {
        path: 'main',
        component: MainPage,
      },
      {
        path: 'artist/:artistId',
        component: ArtistPage,
      },
      {
        path: 'albums/:albumId',
        component: AlbumPage,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [loginGuard],
  },
];
