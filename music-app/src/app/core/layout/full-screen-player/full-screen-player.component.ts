import { Component, computed, HostBinding, inject } from '@angular/core';
import { AudioService } from '../../services/AudioLogic/audio-service';
import { ProgressBarService } from '../../Player/progress-bar.service';
import { LucideAngularModule } from 'lucide-angular';
import { PlayerUiService } from '../../Player/player-ui.service';
@Component({
  selector: 'app-full-screen-player',
  imports: [LucideAngularModule],
  host: {
    '[class.open]': 'uiService.isFullScreen()',
    '[style.--dynamic-color]': 'bgColor.value()',
  },
  templateUrl: './full-screen-player.component.html',
  styleUrl: './full-screen-player.component.css',
})
export class FullScreenPlayerComponent {
  audioService = inject(AudioService);
  progressService = inject(ProgressBarService);
  uiService = inject(PlayerUiService);

  track = this.audioService.currentTrack;
  bgColor = this.uiService.bgColor;
  displayTime = this.progressService.displayTime;
  isPlaying = this.audioService.isPlaying;

  close() {
    this.uiService.toggleFullScreen();
  }

  onInput(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.progressService.onInput(val);
  }

  seekTrack(val: string) {
    const time = Number(val);
    this.progressService.onChange(time);
  }

  progress = computed(() => {
    const dur = this.track()?.duration || 0;
    return this.progressService.getPercent(dur);
  });
}
