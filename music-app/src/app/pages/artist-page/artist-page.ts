import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { AlbumsList } from '../../shared/ui/albums-list/albums-list';
import { SimilarArtists } from '../../shared/ui/similar-artists/similar-artists';
import { MusicDataService } from '../../core/services/data-services/music-data.service';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-artist-page',
  imports: [TrackList, AlbumsList, SimilarArtists, LucideAngularModule, TranslateModule],
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
}
