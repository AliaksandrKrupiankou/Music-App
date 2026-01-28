import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar-component';
import { TranslateService } from '@ngx-translate/core';
import { Auth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
      { provide: TranslateService, useValue: {}},
      { provide: Auth, useValue: {}},
      provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
