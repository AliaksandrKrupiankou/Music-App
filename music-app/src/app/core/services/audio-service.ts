import { effect, inject, Injectable, NgZone, signal } from '@angular/core';
import { PlayingStrategy, Track } from '../../models/app-interface';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { LocalStorageService } from './data-services/local-storage-service';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ImageColorServiceService } from './image-color-service.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  currentTrack = signal<Track | null>(null);
  isPlaying = signal<boolean>(false);
  currentPlaylist = signal<Track[]>([]);
  currentIndex = signal<number | null>(null);
  currentTime = signal<number>(0);
  player = new Audio();
  currentVolume = signal<number>(this.player.volume);
  playingStrategy = signal<PlayingStrategy>(PlayingStrategy.basicPlaying);
  
  colorService = inject(ImageColorServiceService);

  isFullScreen = signal<boolean>(false);

    bgColor = rxResource<string, string | undefined>({
    params: () => this.currentTrack()?.coverUrl,
    stream: ({ params: url }) => {
      return this.colorService.getDominantColor(url) ?? '#323838' 
    }
  })


  toggleFullScreen(){
    this.isFullScreen.set(!this.isFullScreen());
  }

  localStorageService = inject(LocalStorageService);
  zone = inject(NgZone);

  lastTrack = effect(() => {
    this.localStorageService.set('lastTrack', this.currentTrack())
  })

  constructor() {
    this.player.volume = this.localStorageService.get('volume');
    this.currentVolume.set(this.localStorageService.get('volume'));
    
    const lastTrack = this.localStorageService.get('lastTrack');

    if(lastTrack){
      this.currentTrack.set(lastTrack);
      this.player.src = lastTrack.audioUrl;
    }

    fromEvent(this.player, 'ended')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.playNextTrack();
      });

    this.zone.runOutsideAngular(() => {
      fromEvent(this.player, 'timeupdate')
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          this.currentTime.set(this.player.currentTime);
        });
    });
  }

  playTrack(track: Track) {
    if (this.currentTrack()?.id !== track.id) {
      this.currentTime.set(0);
      this.player.src = track.audioUrl;
      this.currentTrack.set(track);
    }

    this.player
      .play()
      .then(() => this.isPlaying.set(true))
      .catch((err) => {
        this.isPlaying.set(false);
        console.log(`Error: ${err}`);
      });
  }

  playFirstTrack(playlist: Track[]){
    this.playTrack(playlist[0]);
    this.currentPlaylist.set(playlist);
  }

  changeVolume(value: string) {
    this.player.volume = Number(value);
    this.currentVolume.set(this.player.volume);
    this.localStorageService.set('volume', this.currentVolume());
  }

  playNextTrack() {
    if (this.currentIndex() === this.currentPlaylist().length - 1) {
      this.stop();
    } else {
      this.currentTime.set(0);
      this.playTrack(this.currentPlaylist()[this.currentIndex()! + 1]);
      this.currentIndex.set(this.currentIndex()! + 1);
    }
  }

  seekTo(newTime: number) {
    this.currentTime.set(newTime);
    this.player.currentTime = newTime;
  }

  playPastTrack() {
    this.currentTime.set(0);
    if (this.currentIndex() === 0) {
      this.player.currentTime = 0;
      this.playTrack(this.currentTrack()!);
    } else {
      this.playTrack(this.currentPlaylist()[this.currentIndex()! - 1]);
      this.currentIndex.set(this.currentIndex()! - 1);
    }
  }

  stop() {
    this.player.pause();
    this.isPlaying.set(false);
  }

  toggle(track: Track) {
    if (this.isPlaying() === true && track.id === this.currentTrack()?.id) {
      this.stop();
    } else {
      this.playTrack(track);
    }
  }

  toggleVolume() {
    if (this.currentVolume() !== 0) {
      this.player.volume = 0;
      this.currentVolume.set(0);
    } else {
      this.player.volume = this.localStorageService.get('volume');
      this.currentVolume.set(this.player.volume);
    }
  }
}
