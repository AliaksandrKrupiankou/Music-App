import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'artist/:artistId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'artist/:artistId/tracks',
    renderMode: RenderMode.Server,
  },
  {
    path: 'albums/:albumId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'playlist/:playlistId',
    renderMode: RenderMode.Server,
  },

  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
