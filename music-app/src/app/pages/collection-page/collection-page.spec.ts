import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPage } from './collection-page';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { NO_ERRORS_SCHEMA, signal, WritableSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FavoriteService } from '../../core/services/favorite-service';
import { AuthService } from '../../core/services/auth-service';
import { Track } from '../../models/app-interface';
import { By } from '@angular/platform-browser';

describe('CollectionPage', () => {
  let component: CollectionPage;
  let fixture: ComponentFixture<CollectionPage>;

  let favoriteSpyService: any;
  let authSpyService: any;

  beforeEach(async () => {
    favoriteSpyService = {
      likedTracks: signal<Track[]>([]),
    };

    authSpyService = {
      user: signal<any>(null),
    };

    favoriteSpyService.likedTracks.set([
      {
        id: '10',
        title: 'Test track',
        artist: 'Test artist',
        artistId: '10',
        album: 'Test data',
        duration: 100,
        audioUrl: 'Test data',
        coverUrl: 'Test data',
      },
    ]);

    authSpyService.user.set({ displayName: 'Test user' });

    await TestBed.configureTestingModule({
      imports: [CollectionPage, TranslateModule.forRoot()],
      providers: [
        { provide: FavoriteService, useValue: favoriteSpyService },
        { provide: AuthService, useValue: authSpyService },
      ],
    })
      .overrideComponent(CollectionPage, {
        remove: {
          imports: [TrackList],
        },

        add: {
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get liked tracks from service', () => {
    const tracks = component.likedTracksList();
    const liked = favoriteSpyService.likedTracks();

    expect(tracks).toEqual(liked);
  });

  it('should update list if service data update', () => {
    expect(component.likedTracksList().length).toBe(1);

    favoriteSpyService.likedTracks.set([]);

    fixture.detectChanges();

    expect(component.likedTracksList.length).toBe(0);
  });

  it('userName from service should be display', () => {
    const user = fixture.debugElement.query(By.css('[userName]')).nativeElement;

    expect(user.textContent).toContain('Test user');
  });
});
