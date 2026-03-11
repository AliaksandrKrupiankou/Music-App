import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTitleComponent } from './playlist-title.component';

describe('PlaylistTitleComponent', () => {
  let component: PlaylistTitleComponent;
  let fixture: ComponentFixture<PlaylistTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
