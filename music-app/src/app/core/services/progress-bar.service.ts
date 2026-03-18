import { inject, Injectable } from '@angular/core';
import { AudioEngineService } from './AudioLogic/audio-engine.service';
import { AudioService } from './AudioLogic/audio-service';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private engine = inject(AudioEngineService);
  private service = inject(AudioService);

  
}
