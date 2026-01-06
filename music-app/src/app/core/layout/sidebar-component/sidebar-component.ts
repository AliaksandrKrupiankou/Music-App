import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { APP_CONFIG, SIDEBAR_CONSTS } from '../../utils/constants/app.constants';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly appName = APP_CONFIG.APP_NAME;
  readonly SectionsNames = SIDEBAR_CONSTS;

  service = inject(AuthService);
  user = this.service.user;

  logout(){
    this.service.logout();
  }
}
