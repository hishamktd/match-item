import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconBoxComponent } from './icon-box/icon-box.component';
import iconsArray from './constants/icons';

interface Icons {
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
    let updatedItems: Icons[];

    if (currentItems.includes(icon)) {
      // If the item is already selected, remove it
      updatedItems = currentItems.filter((item) => item !== icon);
    } else {
      // If the item is not selected, add it
      updatedItems = [...currentItems, icon];
      if (updatedItems.length > 3) {
        // Remove the first item if there are more than 3
        updatedItems.shift();
      }
    }

    // Set the updated selected items
    this.selectedItems.set(updatedItems);

    // Check if all selected items are the same
    if (
      updatedItems.length === 3 &&
      updatedItems.every((item) => item.icon === updatedItems[0].icon)
    ) {
      // Remove the item from iconArray
      const itemToRemove = updatedItems[0].icon;
      const updatedIconArray = this.iconArray().filter(
        (item) => item.icon !== itemToRemove
      );
      this.iconArray.set(updatedIconArray);
    }
  }
}
