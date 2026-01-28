import { TestBed } from '@angular/core/testing';

import { MusicDataService } from './music-data.service';
import { MusicApiService } from './music-api-service';
import { of } from 'rxjs';
import { query } from 'firebase/firestore';

describe('MusicDataService', () => {
  let service: MusicDataService;
  let apiSpy: jasmine.SpyObj<MusicApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MusicApiService', [
      'searchSongs',
      'searchArtists',
      'getArtistById',
      'getAlbumById',
    ]);

    TestBed.configureTestingModule({
      providers: [MusicDataService, { provide: MusicApiService, useValue: spy }],
    });

    service = TestBed.inject(MusicDataService);
    apiSpy = TestBed.inject(MusicApiService) as jasmine.SpyObj<MusicApiService>;
  });

  it('searchTracks should call api and return tracks', (done) => {
    const mockResponce = {
      data: {
        results: [
          {
            id: '1',
            name: 'Test song',
            artists: {
              primary: {
                id: '100',
                name: 'chushka',
              },
            },
            album: { name: 'Test album' },
            duration: '124',
            image: [{ quality: '', url: '' }],
            downloadUrl: [{ quality: '', url: '' }],
          },
        ],
      },
    };

    apiSpy.searchSongs.and.returnValue(of(mockResponce as any));

    service.searchTracks('Query').subscribe((tracks) => {
      expect(apiSpy.searchSongs).toHaveBeenCalledWith({
        query: 'Query',
        limit: 40,
        page: 0,
      });

      expect(tracks.length).toBe(1);
      expect(tracks[0].duration).toBe(124);

      done();
    });
  });

  it('if api return no results service should retirn empty array', (done) => {
    const mockResponce = {
      data: {
        results: null,
      },
    };

    apiSpy.searchSongs.and.returnValue(of(mockResponce as any));

    service.searchTracks('Query').subscribe((tracks) => {
      expect(tracks).toEqual([]);

      done();
    });
  });
});
