import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './data-services/local-storage-service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  translate = inject(TranslateService);
  localStorage = inject(LocalStorageService);

  currentLang = signal<'en' | 'ru'>('en');

  private readonly STORAGE_KEY = 'lang';

  init() {
    this.translate.addLangs(['en', 'ru']);

    const savedLang = this.localStorage.get(this.STORAGE_KEY);

    const useLang = savedLang ? savedLang : 'en';
    this.translate.use(useLang);
    this.setLanguage(useLang);
  }

  setLanguage(lang: 'en' | 'ru') {
    this.translate.use(lang);
    this.currentLang.set(lang);
    this.localStorage.set(this.STORAGE_KEY, lang);
  }

  switchLang() {
    if (this.currentLang() === 'en') {
      this.setLanguage('ru');
    } else {
      this.setLanguage('en');
    }
  }
}
