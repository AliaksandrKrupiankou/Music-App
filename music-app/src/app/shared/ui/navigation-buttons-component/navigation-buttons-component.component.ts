import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular'; 

@Component({
  selector: 'app-navigation-buttons-component',
  imports: [LucideAngularModule],
  templateUrl: './navigation-buttons-component.component.html',
  styleUrl: './navigation-buttons-component.component.css'
})
export class NavigationButtonsComponentComponent {

  navigation = inject(Location);

  goForward(){
    this.navigation.forward();
  }

  goBack(){
    this.navigation.back();
  }
}
