import { Component, EventEmitter, inject, Output } from '@angular/core';
import { IMenu, MenuService } from '../services/menu.service';

@Component({
  selector: 'qr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() onToggleExpanded: EventEmitter<boolean> = new EventEmitter<boolean>()
  expanded = true;
  listMenu: IMenu[];

  menuSrv = inject(MenuService)
  constructor()
  {
    this.listMenu = this.menuSrv.getMenu()
  }

  toggleExpanded() {
    this.expanded = !this.expanded
    this.onToggleExpanded.emit(this.expanded)
  }
}
