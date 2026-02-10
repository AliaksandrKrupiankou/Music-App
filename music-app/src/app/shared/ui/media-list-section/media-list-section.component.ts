import { Component, computed, input } from '@angular/core';
import { MediaContent } from '../../../models/api-artist-page-interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-list-section',
  imports: [RouterLink],
  templateUrl: './media-list-section.component.html',
  styleUrl: './media-list-section.component.css',
})
export class MediaListSectionComponent {
  data = input.required<MediaContent[]>();
  imageForm = input.required<'Square' | 'Circle'>();

  link = computed<'/albums/' | '/artist/'>(() => {
    return 'year' in this.data()[0] ? '/albums/' : '/artist/';
  });


}
