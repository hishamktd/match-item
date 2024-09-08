import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconBoxComponent } from './icon-box/icon-box.component';
import iconsArray from './constants/icons';

interface Icons{
  id: number;
  icon: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-05-fun';

  iconArray = signal<Icons[]>(iconsArray);
  selectedItems = signal<Icons[]>([]);

  handleOnIconClick(icon: Icons) {
    const currentItems = this.selectedItems();
    this.selectedItems.set(
      currentItems.includes(icon)
        ? currentItems.filter((item) => item !== icon)
        : [...currentItems, icon]
    );
  }
}
