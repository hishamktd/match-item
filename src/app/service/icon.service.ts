import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import iconsArray from '../constants/icons';

interface Icons {
  id: number;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private iconArraySubject = new BehaviorSubject<Icons[]>([]);
  private selectedItemsSubject = new BehaviorSubject<Icons[]>([]);
  private removedItemsCount = new BehaviorSubject<number>(0);

  iconArray$ = this.iconArraySubject.asObservable();
  selectedItems$ = this.selectedItemsSubject.asObservable();
  removedItemsCount$ = this.removedItemsCount.asObservable();

  constructor() {
    // Initialize iconArray with default icons
    this.iconArraySubject.next(iconsArray);
  }

  handleOnIconClick(icon: Icons) {
    const currentItems = this.selectedItemsSubject.value;
    let updatedItems: Icons[];

    if (currentItems.includes(icon)) {
      // If the item is already selected, remove it
      updatedItems = currentItems.filter((item) => item !== icon);
    } else if (
      currentItems.every((item) => currentItems?.[0]?.icon === item.icon) &&
      currentItems.length === 3
    ) {
      updatedItems = [icon];
    } else {
      // If the item is not selected, add it
      updatedItems = [...currentItems, icon];
      if (updatedItems.length > 3) {
        // Remove the first item if there are more than 3
        updatedItems.shift();
      }
    }

    // Update selected items
    this.selectedItemsSubject.next(updatedItems);

    // Check if all selected items are the same
    if (
      updatedItems.length === 3 &&
      updatedItems.every((item) => item.icon === updatedItems[0].icon)
    ) {
      // Remove the item from iconArray
      const itemToRemove = updatedItems[0].icon;
      const updatedIconArray = this.iconArraySubject.value.filter(
        (item) => item.icon !== itemToRemove
      );

      // Update the iconArray and increment the removedItemsCount
      this.iconArraySubject.next(updatedIconArray);

      // this.selectedItemsSubject.next([]);
      this.removedItemsCount.next(this.removedItemsCount.value + 3);
    }
  }
}
