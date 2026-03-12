import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AudioService } from '../../services/audio-service';
import { FavoriteService } from '../../services/favorite-service';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { rxResource } from '@angular/core/rxjs-interop';
import { ImageColorServiceService } from '../../services/image-color-service.service';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-player-bar-component',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './player-bar-component.html',
  styleUrl: './player-bar-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerBarComponent {
  service = inject(AudioService);
  like = inject(FavoriteService);
  colorService = inject(ImageColorServiceService);

  currentTrack = this.service.currentTrack;
  currentTime = this.service.currentTime;
  currentVolume = this.service.currentVolume;
  isPlaying = this.service.isPlaying;
  bgColor = this.service.bgColor;

  openFullScreen() {
    this.service.toggleFullScreen();
  }

  seekTrack(val: string) {
    this.service.seekTo(Number(val));
  }

  progress = computed(() => {
    const current = this.service.currentTime();
    const fullTime = this.service.currentTrack()?.duration;

    if (fullTime === 0 || fullTime === null || fullTime === undefined) return 0;

    return (current / fullTime) * 100;
  });

  playNextTrack() {
    this.service.playNextTrack();
  }

  playPastTrack() {
    this.service.playPastTrack();
  }

  toggleLike() {
    this.like.toggleLike(this.currentTrack());
  }

  isLiked() {
    return this.like.isLiked(this.currentTrack());
  }

  playPauseToggle() {
    this.service.toggle(this.currentTrack()!);
  }

  toggleVolume() {
    this.service.toggleVolume();
  }

  changeVolume(volume: string) {
    this.service.changeVolume(volume);
  }
}
