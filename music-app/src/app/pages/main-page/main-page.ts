import { Component, inject } from '@angular/core';
import { TrackList } from "../../shared/ui/track-list/track-list";
import { FavoriteService } from '../../core/services/favorite-service';

@Component({
  selector: 'app-main-page',
  imports: [TrackList],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  likedService = inject(FavoriteService);
  
}
