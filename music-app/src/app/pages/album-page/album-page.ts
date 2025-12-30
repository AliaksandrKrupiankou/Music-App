import { Component, inject, input } from '@angular/core';
import { SearchSongService } from '../../core/services/search-song-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { TrackList } from "../../shared/ui/track-list/track-list";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-album-page',
  imports: [TrackList, RouterLink],
  templateUrl: './album-page.html',
  styleUrl: './album-page.css',
})
export class AlbumPage {
  albumId = input<string>();
  service = inject(SearchSongService);

  albumData = toSignal(
    toObservable(this.albumId).pipe(
      filter(id => !!id && id !== 'undefined'),
      switchMap(id => this.service.getAlbumById(id!))
    )
  )
}
