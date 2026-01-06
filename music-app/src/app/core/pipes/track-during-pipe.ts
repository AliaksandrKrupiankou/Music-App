import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackDuring',
})
export class TrackDuringPipe implements PipeTransform {
  transform(value: number): string {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;

    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    return `${mm}:${ss}`;
  }
}
