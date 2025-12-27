import { Component, computed, inject, input, Signal } from '@angular/core';
import { Track } from '../../../models/app-interface';
import { AudioService } from '../../../core/services/audio-service';

@Component({
  selector: 'app-track-list',
  imports: [],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
})
export class TrackList {
  tracks =  input<Track[]>();
  player = inject(AudioService);

  playTrack(track: Track, playList: Track[]){
    this.player.currentPlaylist.set(playList);
    this.player.currentIndex.set(playList.indexOf(track));
    this.player.toggle(track);
  }
}
