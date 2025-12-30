import { Component, input } from '@angular/core';
import { CompactAlbum } from '../../../models/api-artist-page-interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-albums-list',
  imports: [RouterLink],
  templateUrl: './albums-list.html',
  styleUrl: './albums-list.css',
})
export class AlbumsList {
  albums = input<CompactAlbum[]>();
}
