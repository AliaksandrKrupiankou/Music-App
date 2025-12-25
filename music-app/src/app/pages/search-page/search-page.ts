import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchSongService } from '../../core/services/search-song-service';
import { Track } from '../../models/app-interface';

@Component({
  selector: 'app-search-page',
  imports: [ReactiveFormsModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {

  foundSongs = signal<Track[]>([]);
  service = inject(SearchSongService);


  serachInput = new FormControl('');

  search(){
    const query = this.serachInput.value!;

    this.service.searchSongs(query).subscribe({
      next: (data) => {
        this.foundSongs.set(data);
      },
      error: (err) => {
        console.log(`Error: ${err.message}`)
      }
    })

  }
}
