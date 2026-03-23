import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NavigationButtonsComponentComponent } from '../../navigation-buttons-component/navigation-buttons-component.component';

@Component({
  selector: 'app-entity-header-component-skeleton',
  imports: [NavigationButtonsComponentComponent],
  templateUrl: './entity-header-component-skeleton.component.html',
  styleUrl: './entity-header-component-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityHeaderComponentSkeletonComponent {
  imageForm = input.required<'Square' | 'Circle'>();
}
