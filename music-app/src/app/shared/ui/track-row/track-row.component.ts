import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Track } from '../../../models/app-interface';
import { AudioService } from '../../../core/services/AudioLogic/audio-service';
import { FavoriteService } from '../../../core/services/favorite-service';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TrackDuringPipe } from '../../../core/pipes/track-during-pipe';

@Component({
  selector: 'app-track-row',
  imports: [RouterLink, LucideAngularModule, TrackDuringPipe],
  templateUrl: './track-row.component.html',
  styleUrl: './track-row.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackRowComponent {
  track = input.required<Track>();
  player = inject(AudioService);
  like = inject(FavoriteService);

  playTrackId = output<Track>();

  playTrack() {
    this.playTrackId.emit(this.track());
  }

  toggleLike(track: Track) {
    this.like.toggleLike(track);
  }

  isLiked(track: Track) {
    return this.like.isLiked(track);
  }
}
