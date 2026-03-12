import { Component, HostBinding, inject } from '@angular/core';
import { AudioService } from '../../services/audio-service';
import { BehaviorSubject } from 'rxjs';
import { PlayerBarComponent } from '../player-bar-component/player-bar-component';

@Component({
  selector: 'app-full-screen-player',
  imports: [],
  host: {
    '[class.open]': 'audioService.isFullScreen()',
  },
  templateUrl: './full-screen-player.component.html',
  styleUrl: './full-screen-player.component.css',
})
export class FullScreenPlayerComponent {
  audioService = inject(AudioService);
  
  currentTrack = this.audioService.currentTrack;
  currentTime = this.audioService.currentTime;
  currentVolume = this.audioService.currentVolume;
  isPlaying = this.audioService.isPlaying;
  bgColor = this.audioService.bgColor;

  previous(){
    this.audioService.playPastTrack()
  }

  next(){
    this.audioService.playNextTrack();
  }
  

  close() {
    this.audioService.toggleFullScreen();
  }
}
