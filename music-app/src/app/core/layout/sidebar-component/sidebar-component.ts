import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { APP_CONFIG, SIDEBAR_CONSTS } from '../../utils/constants/app.constants';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, TranslateModule],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly appName = APP_CONFIG.APP_NAME;
  readonly SectionsNames = SIDEBAR_CONSTS;

  languageService = inject(LanguageService);
  service = inject(AuthService);

  currentLang = this.languageService.currentLang;

  user = this.service.user;

  logout() {
    this.service.logout();
  }

  setLang(lang: 'en' | 'ru') {
    this.languageService.setLanguage(lang);
  }
}
