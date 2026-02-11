import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TrackList } from "../../shared/ui/track-list/track-list";
import { FavoriteService } from '../../core/services/favorite-service';
import { Track } from '../../models/app-interface';
import { RouterLink } from '@angular/router';
import { PlaylistsService } from '../../core/services/playlists.service';
import { AuthService } from '../../core/services/auth-service';
import { PlaylistListComponent } from "../../shared/ui/playlist-list/playlist-list.component";
import { MediaListSectionComponent } from "../../shared/ui/media-list-section/media-list-section.component";


@Component({
  selector: 'app-main-page',
  imports: [TranslateModule, TrackList, RouterLink, PlaylistListComponent, MediaListSectionComponent],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {
  favorite = inject(FavoriteService);
  playlist = inject(PlaylistsService);
  uid = inject(AuthService);

  favoriteTracks = computed<Track[]>(() => this.favorite.likedTracks().slice(0, 10));
}
