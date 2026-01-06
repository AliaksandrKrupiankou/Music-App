import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { RouterLink } from '@angular/router';
import { MusicDataService } from '../../core/services/music-data.service';

@Component({
  selector: 'app-album-page',
  imports: [TrackList, RouterLink],
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
}
