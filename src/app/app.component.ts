import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconBoxComponent } from './icon-box/icon-box.component';
import { IconService } from './service/icon.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import iconsArray from './constants/icons';
import { Icons } from './models/icon.mode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconBoxComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ng-05-fun';

  iconArray$!: Observable<Icons[]>;
  selectedItems$!: Observable<Icons[]>;
  totalNumberIcons$!: Observable<number>;
  removedItemsCount$!: Observable<number>;

  initialNumberOfIcons = signal<number>(iconsArray.length);
  isShowTotalNumberOfIcons = signal<boolean>(true);

  constructor(private iconService: IconService) {}

  ngOnInit(): void {
    this.iconArray$ = this.iconService.iconArray$;
    this.selectedItems$ = this.iconService.selectedItems$;
    this.totalNumberIcons$ = this.iconArray$.pipe(map((icons) => icons.length));
    this.removedItemsCount$ = this.iconService.removedItemsCount$;
  }

  handleOnIconClick(icon: Icons) {
    this.iconService.handleOnIconClick(icon);
  }

  toggleShowTotalNumberOfIcons() {
    this.isShowTotalNumberOfIcons.set(!this.isShowTotalNumberOfIcons());
  }
}
