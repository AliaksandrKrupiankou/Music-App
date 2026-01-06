import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  output,
  Signal,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MusicApiService } from '../../../core/services/music-api-service';
import { Track } from '../../../models/app-interface';
import { ReactiveFormsModule } from '@angular/forms';
import { Artist } from '../../../models/api-artists-interface';
import { rxResource, takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, debounceTime, filter, Observable, switchMap, tap } from 'rxjs';
import { MusicDataService } from '../../../core/services/music-data.service';
@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search {
  searchService = inject(MusicDataService);
  typeOfSearch = signal<'songs' | 'artists'>('songs');

  searchResult = output<Track[] | Artist[]>();
  dataType = output<string>();

  serachInput = new FormControl('');

  setSearchType(type: 'songs' | 'artists') {
    this.typeOfSearch.set(type);
  }

  constructor() {
    combineLatest({
      query: this.serachInput.valueChanges,
      type: toObservable(this.typeOfSearch),
    })
      .pipe(
        debounceTime(300),
        filter(({ query }) => !!query && query.length >= 2),
        tap((data) => this.dataType.emit(data.type)),
        switchMap((data) => {
          return data.type === 'artists'
            ? this.searchService.searchArtists(data.query!)
            : this.searchService.searchTracks(data.query!);
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (result) => this.searchResult.emit(result),
        error: (err) => console.error('Search error:', err),
      });
  }
}
