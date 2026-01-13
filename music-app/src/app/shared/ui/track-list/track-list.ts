import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Track } from '../../../models/app-interface';
import { AudioService } from '../../../core/services/audio-service';
import { TrackRowComponent } from '../track-row/track-row.component';
import { FavoriteService } from '../../../core/services/favorite-service';


@Component({
  selector: 'app-track-list',
  imports: [TrackRowComponent],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackList {
  tracks = input.required<Track[]>();
  player = inject(AudioService);
  like = inject(FavoriteService);

  toggleLike(track: Track) {
    this.like.toggleLike(track);
  }

  isLiked(track: Track) {
    return this.like.isLiked(track);
  }

  playTrack(track: Track) {
    this.player.currentPlaylist.set(this.tracks());
    this.player.currentIndex.set(this.tracks().indexOf(track));
    this.player.toggle(track);
  }
}
