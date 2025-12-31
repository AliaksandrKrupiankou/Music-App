import { Component, inject, input } from '@angular/core';
import { SearchSongService } from '../../core/services/search-song-service';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { TrackList } from "../../shared/ui/track-list/track-list";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-album-page',
  imports: [TrackList, RouterLink],
  templateUrl: './album-page.html',
  styleUrl: './album-page.css',
})
export class AlbumPage {
  albumId = input<string>();
  service = inject(SearchSongService);

  albumData = rxResource({
    request: () => this.albumId(),
    loader: ({ request: id }) => this.service.getAlbumById(id)
  });



}
