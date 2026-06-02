import { ChangeDetectionStrategy, Component, computed, HostBinding, inject } from '@angular/core';
import { AudioService } from '../../services/audio-logic/audio-service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { LucideAngularModule } from 'lucide-angular';
import { PlayerUiStore } from '../../store/playerUi.store';
@Component({
  selector: 'app-full-screen-player',
  imports: [LucideAngularModule],
  host: {
    '[class.open]': 'uiStore.isFullScreen()',
    '[style.--dynamic-color]': 'mainColor()',
  },
  templateUrl: './full-screen-player.component.html',
  styleUrl: './full-screen-player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullScreenPlayerComponent {
  audioService = inject(AudioService);
  progressService = inject(ProgressBarService);
  uiStore = inject(PlayerUiStore);

  track = this.audioService.currentTrack;
  mainColor = this.uiStore.mainColor;
  displayTime = this.progressService.displayTime;
  isPlaying = this.audioService.isPlaying;

  close() {
    this.uiStore.toggleFullScreen();
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
