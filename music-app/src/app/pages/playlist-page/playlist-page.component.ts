import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { PlaylistsService } from '../../core/services/playlists.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PlaylistTitleComponent } from './playlist-title/playlist-title.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PlaylistCoverComponent } from './playlist-cover/playlist-cover.component';
import { AuthService } from '../../core/services/auth-service';
import { DatePipe } from '@angular/common';
import { Track } from '../../models/app-interface';
import { Search } from '../../shared/ui/search/search';
import { Router } from '@angular/router';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-playlist-page',
  imports: [
    PlaylistTitleComponent,
    ReactiveFormsModule,
    PlaylistCoverComponent,
    DatePipe,
    Search,
    TrackList,
    LucideAngularModule,
  ],
  templateUrl: './playlist-page.component.html',
  styleUrl: './playlist-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistPageComponent {
  playlistId = input<string>();
  playlistService = inject(PlaylistsService);
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  tracks = signal<Track[]>([]);
  router = inject(Router);

  constructor() {
    effect(() => {
      const data = this.playlistData.value();

      if (data) {
        this.form.patchValue({
          title: data.title,
          coverUrl: data.coverUrl,
        });
      }
    });
  }

  playlistData = rxResource({
    request: () => this.playlistId(),
    loader: ({ request: id }) => this.playlistService.getById(id),
  });

  form = this.formBuilder.group({
    title: `${this.playlistData.value()?.title}`,
    coverUrl: this.playlistData.value()?.coverUrl || null,
  }); //valuchanges

  saveField(controlName: string) {
    const control = this.form.get(controlName);
    control?.disable

    if (control?.dirty && control.valid) {
      const newVal = control.value;

      if (newVal) {
        this.playlistService
          .updatePlaylist(this.playlistId()!, { [controlName]: newVal })
          .then(() => {
            control.markAsPristine();
          })
          .catch((err) => {
            console.error('Error of update playlist:', err);
          });
      }
    }
  }

  deletePlaylist() {
    this.router.navigate(['/main']);
    this.playlistService.deletePlaylist(this.playlistId()!);
  }

  addToPlaylist(track: Track) {
    this.playlistService.addTrackToPlaylist(this.playlistId()!, track);
  }

  deleteFromPlaylist(track: Track) {
    this.playlistService.removeTrackFromPlaylist(this.playlistId()!, track);
  }
}
