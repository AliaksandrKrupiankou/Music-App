import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar-component/sidebar-component';
import { PlayerBarComponent } from '../player-bar-component/player-bar-component';

@Component({
  selector: 'app-main-layout-component',
  imports: [RouterOutlet, SidebarComponent, PlayerBarComponent],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
