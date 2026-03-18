import { Component, computed, HostBinding, inject } from '@angular/core';
import { AudioService } from '../../services/AudioLogic/audio-service';
import { ProgressBarService } from '../../services/progress-bar.service';
@Component({
  selector: 'app-full-screen-player',
  imports: [],
  host: {
    '[class.open]': 'audioService.isFullScreen()',
    '[style.--dynamic-color]': 'bgColor.value()',
  },
  templateUrl: './full-screen-player.component.html',
  styleUrl: './full-screen-player.component.css',
})
export class FullScreenPlayerComponent {
  audioService = inject(AudioService);
  progressService = inject(ProgressBarService);

  track = this.audioService.currentTrack;
  bgColor = this.audioService.bgColor;
  displayTime = this.progressService.displayTime;

  close(){
    this.audioService.toggleFullScreen()
  }

  onInput(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.progressService.onInput(val);
  }

  seekTrack(val: string) {
    const time = Number(val);
    this.audioService.seekTo(time);
    this.progressService.onChange(time);
  }

  progress = computed(() => {
    const dur = this.track()?.duration || 0;
    return this.progressService.getPercent(dur);
  });
}
