import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { TableComponent } from './table/table.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DownloadComponent } from './download/download.component';
import { KeypadButtonComponent } from './keypad-button/keypad-button.component';



@NgModule({
  declarations: [
    ContainerComponent,
    TableComponent,
    PaginatorComponent,
    DownloadComponent,
    KeypadButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerComponent,
    TableComponent,
    PaginatorComponent,
    DownloadComponent,
    KeypadButtonComponent
  ]
})
export class SharedModule { }
