import { Component, inject, output, Signal, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchSongService } from '../../../core/services/search-song-service';
import { Track } from '../../../models/app-interface';
import { ReactiveFormsModule } from '@angular/forms';
import { Artist } from '../../../models/api-artists-interface';
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
    this.dataType.emit(this.typeOfSearch());

    if(this.typeOfSearch() === 'artists'){
      this.searchService.searchArtists(query).subscribe({
        next: (data) => {
          console.log(data);
          this.foundArtists.emit(data);
        },
        error: (err) => {
          console.log(`ERROR: ${err.message}`);
        }
      })

    } else{

    this.searchService.searchSongs(query).subscribe({
      next: (data) => {
        console.log(data);
        this.foundSongs.emit(data);
        return true;
      },
      error: (err) => {
        console.log(`Error: ${err.message}`)
      }
    }) }

  }
}
