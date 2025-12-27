import { Component, inject, signal } from '@angular/core';
import { Track } from '../../models/app-interface';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { Search } from "../../shared/ui/search/search";

@Component({
  selector: 'app-search-page',
  imports: [TrackList, Search],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {
  foundSongs = signal<Track[]>([]);
  
}
