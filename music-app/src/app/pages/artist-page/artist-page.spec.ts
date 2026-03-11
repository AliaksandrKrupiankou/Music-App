import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPage } from './artist-page';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';

describe('ArtistPage', () => {
  let component: ArtistPage;
  let fixture: ComponentFixture<ArtistPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistPage, TranslateModule.forRoot()],
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
