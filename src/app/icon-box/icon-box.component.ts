import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-box',
  standalone: true,
  imports: [],
  templateUrl: './icon-box.component.html',
  styleUrl: './icon-box.component.css',
})
export class IconBoxComponent {
  @Input() selected = false;
  @Output() iconClick = new EventEmitter();

  onIconClick() {
    this.iconClick.emit();
  }
}
