import { Component, inject, output, Signal, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchSongService } from '../../../core/services/search-song-service';
import { Track } from '../../../models/app-interface';
import { ReactiveFormsModule } from '@angular/forms';
import { Artist } from '../../../models/api-artists-interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchService = inject(SearchSongService);
  typeOfSearch = signal<string>('songs');

  foundSongs = output<Track[]>();
  foundArtists = output<Artist[]>();
  dataType = output<string>()

  serachInput = new FormControl('');

  setSearchType(type: string){
    this.typeOfSearch.set(type);
  }

  search(){
    const query = this.serachInput.value!;
    const type = this.typeOfSearch();

    this.dataType.emit(type);
    
    const request = 
    (type === 'artists'
    ? this.searchService.searchArtists(query)
    : this.searchService.searchSongs(query)) as Observable<Artist[] | Track[]>

    request.subscribe({
      next: (data) => {
        if(type === 'artists'){
          this.foundArtists.emit(data as Artist[])
        } else {
          this.foundSongs.emit(data as Track[]);
        }
      },
      error: (err) => {
        console.error(`Error of search: ${err}`);
      }
    })

  }
}
