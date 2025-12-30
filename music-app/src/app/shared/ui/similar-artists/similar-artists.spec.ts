import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarArtists } from './similar-artists';

describe('SimilarArtists', () => {
  let component: SimilarArtists;
  let fixture: ComponentFixture<SimilarArtists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarArtists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarArtists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
