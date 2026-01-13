import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TrackList } from "../../shared/ui/track-list/track-list";
import { FavoriteService } from '../../core/services/favorite-service';
import { Track } from '../../models/app-interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-main-page',
  imports: [TranslateModule, TrackList, RouterLink],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {
  favorite = inject(FavoriteService);

  favoriteTracks = signal<Track[]>(this.favorite.likedTracks().slice(0, 10));
}
