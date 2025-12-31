import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FavoriteService } from '../../core/services/favorite-service';
import { TrackList } from "../../shared/ui/track-list/track-list";

@Component({
  selector: 'app-playlist-page',
  imports: [TrackList],
  templateUrl: './playlist-page.html',
  styleUrl: './playlist-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistPage {
  likedService = inject(FavoriteService);
}
