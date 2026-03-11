import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPage } from './main-page';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPage, TranslateModule.forRoot()],
      providers: [
        { provide: Firestore, useValue: {}},
        { provide: Auth, useValue: {}},

        provideRouter([]),
        provideHttpClient(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
