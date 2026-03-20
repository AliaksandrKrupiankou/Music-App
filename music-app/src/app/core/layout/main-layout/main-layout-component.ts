import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar-component/sidebar-component';
import { PlayerBarComponent } from '../player-bar-component/player-bar-component';
import { NgScrollbar } from 'ngx-scrollbar';
import { FullScreenPlayerComponent } from "../full-screen-player/full-screen-player.component";
@Component({
  selector: 'app-main-layout-component',
  imports: [RouterOutlet, SidebarComponent, PlayerBarComponent, NgScrollbar, FullScreenPlayerComponent],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
