import { Component, input } from '@angular/core';
import { Artist } from '../../../models/api-artists-interface';

@Component({
  selector: 'app-artists-list',
  imports: [],
  templateUrl: './artists-list.html',
  styleUrl: './artists-list.css',
})
export class ArtistsList {
  artists = input<Artist[]>([]);
}
