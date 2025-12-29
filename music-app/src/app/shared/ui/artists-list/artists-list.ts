import { Component, input } from '@angular/core';
import { Artist } from '../../../models/api-artists-interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-artists-list',
  imports: [RouterLink],
  templateUrl: './artists-list.html',
  styleUrl: './artists-list.css',
})
export class ArtistsList {
  artists = input<Artist[]>([]);
}
