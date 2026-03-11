import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityHeaderComponentSkeletonComponent } from './entity-header-component-skeleton.component';

describe('EntityHeaderComponentSkeletonComponent', () => {
  let component: EntityHeaderComponentSkeletonComponent;
  let fixture: ComponentFixture<EntityHeaderComponentSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityHeaderComponentSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityHeaderComponentSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
