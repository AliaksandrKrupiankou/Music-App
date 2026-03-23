import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AudioService } from '../../services/AudioLogic/audio-service';
import { FavoriteService } from '../../services/favorite-service';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ProgressBarService } from '../../Player/progress-bar.service';
import { PlayerUiService } from '../../Player/player-ui.service';

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
  readonly uiService = inject(PlayerUiService);

  displayTime = this.progressService.displayTime;

  currentTrack = this.service.currentTrack;
  currentTime = this.progressService.currentTime;
  currentVolume = this.service.currentVolume;
  isPlaying = this.service.isPlaying;
  bgColor = this.uiService.bgColor;

  progress = computed(() => {
    const dur = this.service.currentTrack()?.duration || 0;
    return this.progressService.getPercent(dur);
  });

  onInput(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.progressService.onInput(val);
  }

  seekTrack(val: string){
    this.progressService.onChange(Number(val));
  }

  openFullScreen() {
    this.uiService.toggleFullScreen();
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
