import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRowComponent } from './track-row.component';
import { NO_ERRORS_SCHEMA, signal, WritableSignal } from '@angular/core';
import { Track } from '../../../models/app-interface';
import { AudioService } from '../../../core/services/audio-service';
import { By } from '@angular/platform-browser';
import { FavoriteService } from '../../../core/services/favorite-service';
import { provideRouter } from '@angular/router';
import { Heart, LucideAngularModule, Pause, Play } from 'lucide-angular';

describe('TrackRowComponent', () => {
  let component: TrackRowComponent;
  let fixture: ComponentFixture<TrackRowComponent>;

  let audioSpy: {
    isPlaying: WritableSignal<boolean>;
    currentTrack: WritableSignal<Track | null>;
  };

  let favoriteSpy: jasmine.SpyObj<any>;

  let mockTrack = {
    id: '10',
    title: 'Test track',
    artist: 'Test artist',
    artistId: '10',
    album: 'Test data',
    duration: 100,
    audioUrl: 'Test data',
    coverUrl: 'Test data',
  };

  beforeEach(async () => {
    audioSpy = {
      isPlaying: signal(false),
      currentTrack: signal(null),
    };

    favoriteSpy = jasmine.createSpyObj('FavoriteService', ['toggleLike', 'isLiked']);
    favoriteSpy.isLiked.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [TrackRowComponent, LucideAngularModule.pick({ Heart, Play, Pause })],
      providers: [
        { provide: AudioService, useValue: audioSpy },
        { provide: FavoriteService, useValue: favoriteSpy },
        provideRouter([]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('track', mockTrack);
    fixture.detectChanges();
  });

  it('should display play icon when track dont play', () => {
    audioSpy.isPlaying.set(false);
    fixture.detectChanges();

    const playIcon = fixture.debugElement.query(By.css('[name="play"]'));
    const pauseIcon = fixture.debugElement.query(By.css('[name="pause"]'));

    expect(playIcon).toBeTruthy();
    expect(pauseIcon).toBeFalsy();
  });

  it('if playing track and current are equal, should display pause icon', () => {
    audioSpy.currentTrack.set(mockTrack);
    audioSpy.isPlaying.set(true);

    fixture.detectChanges();

    const pauseIcon = fixture.debugElement.query(By.css('[name="pause"]'));
    const playIcon = fixture.debugElement.query(By.css('[name="play"]'));

    expect(pauseIcon).toBeTruthy();
    expect(playIcon).toBeFalsy();
  });
});
