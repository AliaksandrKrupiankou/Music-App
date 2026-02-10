import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { RouterLink } from '@angular/router';
import { MusicDataService } from '../../core/services/data-services/music-data.service';
import { TranslateModule } from '@ngx-translate/core';
import { EntityHeaderComponentComponent } from "../../shared/ui/entity-header-component/entity-header-component.component";
import { HeaderDescriptionData } from '../../models/app-interface';

@Component({
  selector: 'app-album-page',
  imports: [TrackList, RouterLink, TranslateModule, EntityHeaderComponentComponent],
  templateUrl: './album-page.html',
  styleUrl: './album-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumPage {
  albumId = input<string>();
  service = inject(MusicDataService);

  albumData = rxResource({
    request: () => this.albumId(),
    loader: ({ request: id }) => this.service.getAlbumById(id),
  });

  headerDiscription = computed(() => {
    return {
      artistName: this.albumData.value()?.artistName,
      artistId: this.albumData.value()?.artistId,
      yearOfAlbum: this.albumData.value()?.year,
    } as HeaderDescriptionData
  })
}
