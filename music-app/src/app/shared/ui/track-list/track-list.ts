import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Track } from '../../../models/app-interface';
import { AudioService } from '../../../core/services/audio-service';
import { TrackDuringPipe } from '../../../core/pipes/track-during-pipe';
import { FavoriteService } from '../../../core/services/favorite-service';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
@Component({
  selector: 'app-track-list',
  imports: [TrackDuringPipe, RouterLink, LucideAngularModule],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackList {
  tracks = input<Track[]>();
  player = inject(AudioService);
  like = inject(FavoriteService);

  toggleLike(track: Track) {
    this.like.toggleLike(track);
  }

  isLiked(track: Track) {
    return this.like.isLiked(track);
  }

  playTrack(track: Track, playList: Track[]) {
    this.player.currentPlaylist.set(playList);
    this.player.currentIndex.set(playList.indexOf(track));
    this.player.toggle(track);
  }
}
