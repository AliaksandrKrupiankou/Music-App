import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { APP_CONFIG } from '../../core/utils/constants/app.constants';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, UpperCasePipe],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
  auth = inject(AuthService);
  appName = APP_CONFIG.APP_NAME;
}
