import { Component, computed, inject, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderDescriptionData } from '../../../models/app-interface';
import { TwitterHoverDirective } from '../../derectives/twitter-hover.directive';
import { ImageColorServiceService } from '../../../core/services/image-color-service.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-entity-header-component',
  imports: [LucideAngularModule, RouterLink, TranslateModule, TwitterHoverDirective],
  templateUrl: './entity-header-component.component.html',
  styleUrl: './entity-header-component.component.css',
})
export class EntityHeaderComponentComponent {
  typeOfPage = input.required<'Playlist' | 'Album' | 'Artist'>();
  image = input<string>();
  imageForm = input.required<'Square' | 'Circle'>();
  title = input.required<string>();

  colorService = inject(ImageColorServiceService);

    bgColor = rxResource({
    request: () => this.image(),
    loader: ({ request: url }) => {
      return this.colorService.getDominantColor(url) ?? '#565c5c' 
    }
  })

  description = input.required<HeaderDescriptionData>();
  

  typeOfPageTranslate = computed(() => {
    if (this.typeOfPage() === 'Album') {
      return 'ALBUM';
    } else {
      return this.typeOfPage() === 'Artist' ? 'ARTIST' : 'PLAYLIST';
    }
  });
}
