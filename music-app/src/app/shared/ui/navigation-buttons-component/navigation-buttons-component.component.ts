import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navigation-buttons-component',
  imports: [LucideAngularModule],
  templateUrl: './navigation-buttons-component.component.html',
  styleUrl: './navigation-buttons-component.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtonsComponentComponent {
  navigation = inject(Location);

  goForward() {
    this.navigation.forward();
  }

  goBack() {
    this.navigation.back();
  }
}
