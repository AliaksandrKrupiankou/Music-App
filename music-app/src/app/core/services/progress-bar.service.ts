import { computed, inject, Injectable, signal } from '@angular/core';
import { AudioEngineService } from './AudioLogic/audio-engine.service';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private engine = inject(AudioEngineService);

  private frameId: number | null = null;
  currentTime = signal(0);
  isDragging = signal(false);
  manualTime = signal(0);

  displayTime = computed(() => {
    return this.isDragging() ? this.manualTime() : this.currentTime();
  });

  getPercent(duration: number) {
    return duration > 0 ? (this.displayTime() / duration) * 100 : 0;
  }

  start() {
    const frame = () => {
      const player = this.engine.player;
      if (player && !player.paused) {
        this.currentTime.set(player.currentTime);
        this.frameId = requestAnimationFrame(frame);
      }
    };
    this.frameId = requestAnimationFrame(frame);
  }

  stop() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
  }

  onInput(value: number) {
    this.isDragging.set(true);
    this.manualTime.set(value);
  }

  onChange(val: number) {
    this.isDragging.set(false);
    return val;
  }
}
