import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SearchSongService } from '../../core/services/search-song-service';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { AlbumsList } from "../../shared/ui/albums-list/albums-list";
import { SimilarArtists } from "../../shared/ui/similar-artists/similar-artists";

@Component({
  selector: 'app-artist-page',
  imports: [TrackList, AlbumsList, SimilarArtists],
  templateUrl: './artist-page.html',
  styleUrl: './artist-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistPage {
  artistId = input<string>();
  artistService = inject(SearchSongService);

  artistProfile = rxResource({
    request: () => this.artistId(),
    loader: ({ request: id }) => this.artistService.getArtistById(id),
  })

}
