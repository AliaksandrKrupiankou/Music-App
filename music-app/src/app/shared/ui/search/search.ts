import { Component, inject, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchSongService } from '../../../core/services/search-song-service';
import { Track } from '../../../models/app-interface';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  service = inject(SearchSongService);
  foundSongs = output<Track[]>();

  serachInput = new FormControl('');

  search(){
    const query = this.serachInput.value!;

    this.service.searchSongs(query).subscribe({
      next: (data) => {
        console.log(data);
        this.foundSongs.emit(data);
        return true;
      },
      error: (err) => {
        console.log(`Error: ${err.message}`)
      }
    })

  }
}
