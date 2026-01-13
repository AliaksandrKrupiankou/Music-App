import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FavoriteService } from '../../core/services/favorite-service';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { AuthService } from '../../core/services/auth-service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-collection-page',
  imports: [TrackList, TranslateModule],
  templateUrl: './collection-page.html',
  styleUrl: './collection-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPage {
  likedService = inject(FavoriteService);
  authService = inject(AuthService);

  likedTracksList = this.likedService.likedTracks;
  userName = this.authService.user()?.displayName;
}
