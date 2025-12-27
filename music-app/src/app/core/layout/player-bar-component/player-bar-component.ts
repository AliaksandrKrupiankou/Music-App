import { Component, inject } from '@angular/core';
import { AudioService } from '../../services/audio-service';

@Component({
  selector: 'app-player-bar-component',
  imports: [],
  templateUrl: './player-bar-component.html',
  styleUrl: './player-bar-component.css',
})
export class PlayerBarComponent {
  service = inject(AudioService);

  seekTrack(val: string){
    this.service.seekTo(Number(val))
  }
}
