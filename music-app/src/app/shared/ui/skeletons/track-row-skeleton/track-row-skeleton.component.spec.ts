import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRowSkeletonComponent } from './track-row-skeleton.component';

describe('TrackRowSkeletonComponent', () => {
  let component: TrackRowSkeletonComponent;
  let fixture: ComponentFixture<TrackRowSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackRowSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackRowSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
