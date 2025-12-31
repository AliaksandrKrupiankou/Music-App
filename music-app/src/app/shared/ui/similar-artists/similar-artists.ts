import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ArtistProfile, SimilarArtist } from '../../../models/api-artist-page-interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-similar-artists',
  imports: [RouterLink],
  templateUrl: './similar-artists.html',
  styleUrl: './similar-artists.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimilarArtists {
  artists = input<SimilarArtist[]>();
}
