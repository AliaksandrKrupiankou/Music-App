import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenPlayerComponent } from './full-screen-player.component';

describe('FullScreenPlayerComponent', () => {
  let component: FullScreenPlayerComponent;
  let fixture: ComponentFixture<FullScreenPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullScreenPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullScreenPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
