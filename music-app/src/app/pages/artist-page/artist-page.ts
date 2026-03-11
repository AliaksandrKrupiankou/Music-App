import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { MusicDataService } from '../../core/services/data-services/music-data.service';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TwitterHoverDirective } from '../../shared/derectives/twitter-hover.directive';
import { MediaListSectionComponent } from '../../shared/ui/media-list-section/media-list-section.component';
import { MediaContent } from '../../models/api-artist-page-interface';
import { EntityHeaderComponentComponent } from "../../shared/ui/entity-header-component/entity-header-component.component";
import { HeaderDescriptionData } from '../../models/app-interface';
import { ListenButtonComponentComponent } from "../../shared/ui/listen-button-component/listen-button-component.component";
import { EntityHeaderComponentSkeletonComponent } from "../../shared/ui/skeletons/entity-header-component-skeleton/entity-header-component-skeleton.component";
import { TrackRowSkeletonComponent } from "../../shared/ui/skeletons/track-row-skeleton/track-row-skeleton.component";

@Component({
  selector: 'app-artist-page',
  imports: [
    TrackList,
    LucideAngularModule,
    TranslateModule,
    TwitterHoverDirective,
    MediaListSectionComponent,
    EntityHeaderComponentComponent,
    ListenButtonComponentComponent,
    EntityHeaderComponentSkeletonComponent,
    TrackRowSkeletonComponent
],
  templateUrl: './artist-page.html',
  styleUrl: './artist-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPage {
  artistId = input<string>();
  artistService = inject(MusicDataService);

  artistProfile = rxResource({
    request: () => this.artistId(),
    loader: ({ request: id }) => this.artistService.getArtistById(id),
  });

  headerDiscriptionInfo = computed(() => {
    return {
      countOfListners: this.artistProfile.value()?.fanCount
    } as HeaderDescriptionData
  })

  similarArtists = computed(() => {
    const data = this.artistProfile.value()?.similarArtists;
    return data && data.length ? (data as MediaContent[]) : [];
  });

  topAlbums = computed(() => {
    const data = this.artistProfile.value()?.topAlbums;
    return data && data.length ? (data as MediaContent[]) : []; 
  })
}
