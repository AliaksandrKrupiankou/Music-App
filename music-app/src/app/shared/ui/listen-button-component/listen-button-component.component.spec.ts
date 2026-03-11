import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenButtonComponentComponent } from './listen-button-component.component';

describe('ListenButtonComponentComponent', () => {
  let component: ListenButtonComponentComponent;
  let fixture: ComponentFixture<ListenButtonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListenButtonComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListenButtonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
