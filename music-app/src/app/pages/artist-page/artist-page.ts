import { Component, inject, input } from '@angular/core';
import { SearchSongService } from '../../core/services/search-song-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { TrackList } from '../../shared/ui/track-list/track-list';

@Component({
  selector: 'app-artist-page',
  imports: [TrackList],
  templateUrl: './artist-page.html',
  styleUrl: './artist-page.css',
})
export class ArtistPage {
  artistId = input<string>();
  artistService = inject(SearchSongService);

  artistProfile = toSignal(
    toObservable(this.artistId).pipe(
      filter(id => !!id && id !== 'undefined'),
      switchMap(id => this.artistService.getArtistById(id!))
    )
  )
}
