import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Track } from '../../models/app-interface';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { Search } from "../../shared/ui/search/search";
import { Artist } from '../../models/api-artists-interface';
import { ArtistsList } from "../../shared/ui/artists-list/artists-list";

@Component({
  selector: 'app-search-page',
  imports: [TrackList, Search, ArtistsList],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPage {
  foundSongs = signal<Track[]>([]);
  dataType = signal<string>('');
  foundArtists = signal<Artist[]>([]);
}
