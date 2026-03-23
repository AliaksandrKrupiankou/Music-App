import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FastAverageColor } from 'fast-average-color';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageColorServiceService {

  private fac = new FastAverageColor();
  

   getDominantColor(imageUrl: string): Observable<string> {
    return from(
      this.fac.getColorAsync(imageUrl, {
        algorithm: 'dominant',
        crossOrigin: 'anonymous',
        ignoredColor: [
          [255, 255, 255, 255],
          [0, 0, 0, 255],
        ]
      })
    ).pipe(
      map(res => res.hex),
    )
  }
}
