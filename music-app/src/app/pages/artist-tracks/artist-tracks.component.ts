import { Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { MusicDataService } from '../../core/services/data-services/music-data.service';
import { NavigationButtonsComponentComponent } from '../../shared/ui/navigation-buttons-component/navigation-buttons-component.component';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { Track } from '../../models/app-interface';

@Component({
  selector: 'app-artist-tracks',
  imports: [NavigationButtonsComponentComponent, TrackList],
  templateUrl: './artist-tracks.component.html',
  styleUrl: './artist-tracks.component.css',
})
export class ArtistTracksComponent {
  artistId = input.required<string>();
  dataService = inject(MusicDataService);

  observer?: IntersectionObserver;

  allTracks = signal<Track[]>([]);
  page = 0;

  anchor = viewChild<ElementRef>('scrollAnchor');

  ngAfterViewInit() {
    this.setupIntersectionObserver();
    this.loadMore();
  }

  loadMore() {
    this.dataService
      .getPopularSongsByArtistId(this.artistId(), this.page)
      .subscribe((newTracks) => {
        this.allTracks.update((val) => [...val, ...newTracks]);
        this.page++;
      });
  }

  setupIntersectionObserver() {
    const anchor = this.anchor()?.nativeElement;
     this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.loadMore();
        }
      },
      { root: null, rootMargin: '300px', threshold: 0.5 },
    );
    this.observer.observe(anchor);
  }

  ngOnDestroy(){
    if(this.observer){
      this.observer.disconnect();
    }
  }
}
