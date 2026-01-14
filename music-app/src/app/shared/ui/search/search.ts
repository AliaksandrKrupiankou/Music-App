import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Track } from '../../../models/app-interface';
import { ReactiveFormsModule } from '@angular/forms';
import { Artist } from '../../../models/api-artists-interface';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, debounceTime, filter, of, switchMap, tap } from 'rxjs';
import { MusicDataService } from '../../../core/services/data-services/music-data.service';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, LucideAngularModule, TranslateModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search {
  searchService = inject(MusicDataService);
  typeOfSearch = signal<'songs' | 'artists'>('songs');


  showTypes = input<boolean>(true);
  

  searchResult = output<Track[] | Artist[]>();
  dataType = output<string>();

  searchInput = new FormControl('');

  setSearchType(type: 'songs' | 'artists') {
    this.typeOfSearch.set(type);
  }

  constructor() {
    combineLatest({
      query: this.searchInput.valueChanges,
      type: toObservable(this.typeOfSearch),
    })
      .pipe(
        debounceTime(300),
        switchMap(({ query , type}) => {

          if(!query || query.length === 0 ){
            this.searchResult.emit([]);
            return of([]);
          }
          this.dataType.emit(type);
          return type === 'artists'
            ? this.searchService.searchArtists(query!)
            : this.searchService.searchTracks(query!);
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (result) => this.searchResult.emit(result),
        error: (err) => console.error('Search error:', err),
      });
  }
}
