import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FavoriteService } from '../../core/services/favorite-service';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { AuthService } from '../../core/services/auth-service';
import { TranslateModule } from '@ngx-translate/core';
import { EntityHeaderComponentComponent } from '../../shared/ui/entity-header-component/entity-header-component.component';
import { HeaderDescriptionData } from '../../models/app-interface';
import { ListenButtonComponentComponent } from '../../shared/ui/listen-button-component/listen-button-component.component';

@Component({
  selector: 'app-collection-page',
  imports: [
    TrackList,
    TranslateModule,
    EntityHeaderComponentComponent,
    ListenButtonComponentComponent,
  ],
  templateUrl: './collection-page.html',
  styleUrl: './collection-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPage {
  likedService = inject(FavoriteService);
  authService = inject(AuthService);

  likedTracksList = this.likedService.likedTracks;
  headerDiscriptionData = {
    username: this.authService.user()?.displayName,
  } as HeaderDescriptionData;
}
