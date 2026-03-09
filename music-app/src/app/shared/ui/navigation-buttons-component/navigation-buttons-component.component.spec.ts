import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationButtonsComponentComponent } from './navigation-buttons-component.component';

describe('NavigationButtonsComponentComponent', () => {
  let component: NavigationButtonsComponentComponent;
  let fixture: ComponentFixture<NavigationButtonsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationButtonsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationButtonsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
