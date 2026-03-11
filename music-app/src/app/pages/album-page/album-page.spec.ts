import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPage } from './album-page';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { TrackList } from '../../shared/ui/track-list/track-list';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AlbumPage', () => {
  let component: AlbumPage;
  let fixture: ComponentFixture<AlbumPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumPage, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .overrideComponent(AlbumPage, {
      remove: {
        imports: [TrackList],
      },

      add: {
        schemas: [NO_ERRORS_SCHEMA]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
