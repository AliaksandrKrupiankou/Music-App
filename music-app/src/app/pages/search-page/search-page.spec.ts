import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPage } from './search-page';
import { provideHttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPage],
      providers: [
        provideHttpClient(),
        { provide: TranslateService, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
