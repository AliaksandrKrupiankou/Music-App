import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaListSectionComponent } from './media-list-section.component';

describe('MediaListSectionComponent', () => {
  let component: MediaListSectionComponent;
  let fixture: ComponentFixture<MediaListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaListSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
