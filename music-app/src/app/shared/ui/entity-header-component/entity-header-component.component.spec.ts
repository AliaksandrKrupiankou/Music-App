import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityHeaderComponentComponent } from './entity-header-component.component';

describe('EntityHeaderComponentComponent', () => {
  let component: EntityHeaderComponentComponent;
  let fixture: ComponentFixture<EntityHeaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityHeaderComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
