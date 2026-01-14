import { Component, computed, effect, inject } from '@angular/core';
import { PlaylistsService } from '../../../core/services/playlists.service';
import { AuthService } from '../../../core/services/auth-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Playlist } from '../../../models/playlist-model';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

type PlaylistListItem =
  | { type: 'create'; id: 'create-action' }
  | (Playlist & { type?: 'playlist' });

@Component({
  selector: 'app-playlist-list',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.css',
})
export class PlaylistListComponent {
  playlistService = inject(PlaylistsService);
  authService = inject(AuthService);
  uid = this.authService.user()?.uid;
  router = inject(Router);

  playlists = rxResource({
    request: () => this.uid,
    loader: ({ request: uid }) => this.playlistService.getUserPlaylists(uid),
  });

  playlistWithButton = computed<PlaylistListItem[]>(() => {
    const playlistst = this.playlists.value() ?? [];

    return [{ type: 'create', id: 'create-action' }, ...playlistst];
  });

  createAndRoute() {
    this.playlistService.createPlaylist(this.uid!).then((val) => {
      this.router.navigate(['/playlist/', val]);
    });
  }
}
