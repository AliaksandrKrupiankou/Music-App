import { Component, computed, inject } from '@angular/core';
import { AudioService } from '../../services/audio-service';
import { FavoriteService } from '../../services/favorite-service';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-player-bar-component',
  imports: [],
  templateUrl: './player-bar-component.html',
  styleUrl: './player-bar-component.css',
})
export class PlayerBarComponent {
  service = inject(AudioService);
  like = inject(FavoriteService);


  seekTrack(val: string){
    this.service.seekTo(Number(val))
  };

  progress = computed(() => {
    const current = this.service.currentTime();
    const fullTime = this.service.currentTrack()?.duration;

    if(fullTime === 0 || fullTime === null || fullTime === undefined) return 0;

    return (current / fullTime) * 100;
  })
}
