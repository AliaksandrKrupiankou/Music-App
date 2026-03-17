import { Component, inject, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AudioService } from '../../../core/services/AudioLogic/audio-service';
import { Track } from '../../../models/app-interface';

@Component({
  selector: 'app-listen-button-component',
  imports: [LucideAngularModule],
  templateUrl: './listen-button-component.component.html',
  styleUrl: './listen-button-component.component.css',
})
export class ListenButtonComponentComponent {
  data = input.required<Track[]>();

  audioService = inject(AudioService);

  playFirst() {
    this.audioService.playFirstTrack(this.data());
  }
}
