import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Track } from '../../models/app-interface';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { Search } from '../../shared/ui/search/search';
import { Artist } from '../../models/api-artists-interface';
import { ArtistsList } from '../../shared/ui/artists-list/artists-list';

@Component({
  selector: 'app-search-page',
  imports: [TrackList, Search, ArtistsList],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  searchResult = signal<Track[] | Artist[]>([]);
  dataType = signal<string>('');

  artists = computed(() =>
    this.dataType() === 'artists' ? (this.searchResult() as Artist[]) : []
  );

  songs = computed(() => (this.dataType() === 'songs' ? (this.searchResult() as Track[]) : []));
}
