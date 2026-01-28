import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login-page';
import { AuthService } from '../../core/services/auth-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginPage, TranslateModule.forRoot()],
      providers: [{ provide: AuthService, useValue: authSpy }],
  })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('by click login btn should call service method login', (done) => {
    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    expect(authSpy.login).toHaveBeenCalled();
    done();
  })
});
