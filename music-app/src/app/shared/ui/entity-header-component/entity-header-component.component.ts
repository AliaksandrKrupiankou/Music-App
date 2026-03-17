import { Component, computed, inject, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderDescriptionData } from '../../../models/app-interface';
import { TwitterHoverDirective } from '../../derectives/twitter-hover.directive';
import { ImageColorServiceService } from '../../../core/services/image-color-service.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { NavigationButtonsComponentComponent } from "../navigation-buttons-component/navigation-buttons-component.component";

@Component({
  selector: 'app-entity-header-component',
  imports: [LucideAngularModule, RouterLink, TranslateModule, TwitterHoverDirective, NavigationButtonsComponentComponent],
  templateUrl: './entity-header-component.component.html',
  styleUrl: './entity-header-component.component.css',
})
export class EntityHeaderComponentComponent {
  typeOfPage = input.required<'Playlist' | 'Album' | 'Artist'>();
  image = input<string>();
  imageForm = input.required<'Square' | 'Circle'>();
  title = input.required<string>();

  colorService = inject(ImageColorServiceService);
  navigation = inject(Location);



  back(){
    this.navigation.back()
  }

  forward(){
    this.navigation.forward();
  }

    bgColor = rxResource({
    params: () => this.image(),
    stream: ({ params: url }) => {
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
