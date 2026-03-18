import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AudioService } from '../../services/AudioLogic/audio-service';
import { FavoriteService } from '../../services/favorite-service';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { rxResource } from '@angular/core/rxjs-interop';
import { ImageColorServiceService } from '../../services/image-color-service.service';
import { from, of } from 'rxjs';
import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  selector: 'app-player-bar-component',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './player-bar-component.html',
  styleUrl: './player-bar-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerBarComponent {
  service = inject(AudioService);
  progressService = inject(ProgressBarService);
  like = inject(FavoriteService);
  colorService = inject(ImageColorServiceService);

  displayTime = this.progressService.displayTime;

  progress = computed(() => {
    const dur = this.service.currentTrack()?.duration || 0;
    return this.progressService.getPercent(dur);
  });

  currentTrack = this.service.currentTrack;
  currentTime = this.service.currentTime;
  currentVolume = this.service.currentVolume;
  isPlaying = this.service.isPlaying;
  bgColor = this.service.bgColor;

  onInput(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.progressService.onInput(val);
  }

  seekTrack(val: string) {
    const time = Number(val);
    this.service.seekTo(time);
    this.progressService.onChange(time);
  }

  openFullScreen() {
    this.service.toggleFullScreen();
  }

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
