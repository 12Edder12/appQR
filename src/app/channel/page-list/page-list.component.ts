import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { environment } from 'src/environments/environment.development';

export interface IChannel {
  _id: number; 
  name: string;
  descripcion: string; 
}
@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
 data: IChannel[] = [
    { _id: 1, name: 'Facebook', descripcion: 'Red social' },
    { _id: 2, name: 'Instagram', descripcion: 'Red social' },
    { _id: 3, name: 'Twitter', descripcion: 'Red social' },
    { _id: 4, name: 'Tiktok', descripcion: 'Red social' },
    { _id: 5, name: 'Youtube', descripcion: 'Red social' },
    { _id: 6, name: 'Facebook', descripcion: 'Red social' },
    { _id: 7, name: 'Instagram', descripcion: 'Red social' },
    { _id: 8, name: 'Twitter', descripcion: 'Red social' },
    { _id: 9, name: 'Tiktok', descripcion: 'Red social' },
  ];

  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "name", title: "NOMBRE" },
    { field: "description", title: "DESCRIPCIÓN" }
  ];
  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];
  records: IChannel[] = [];
  totalRecords = this.data.length;

  currentPage = 0;

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.loadChannels();
  }

  loadChannels() {
    this.records = [...this.data];
    this.changePage(this.currentPage);
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind._id === id);
    if (position !== -1) {
      this.data.splice(position, 1);
      this.totalRecords = this.data.length;
      this.loadChannels();
    }
  }

  openForm(row: IChannel | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };
    const reference: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, options);

    reference.afterClosed().subscribe((response) => {
      if (!response) { return; }
      if (response._id) {
        const index = this.data.findIndex(channel => channel._id === response._id);
        if (index !== -1) {
          this.data[index] = response;
        }
        this.totalRecords = this.data.length; 
        this.loadChannels();
        this.showMessage('Registro actualizado');
      } else {
        const newchannel = { ...response, _id: this.data.length + 1 };
        this.data.push(newchannel);
        this.totalRecords = this.data.length;
        this.loadChannels();
        this.showMessage('Registro exitoso');
      }
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet("Lista de canales", "canales", this.data);
        break;
      case 'NEW':
        this.openForm();
        break;
    }
  }

  showBottomSheet(title: string, fileName: string, data: any) {
    this.bottomSheet.open(DownloadComponent);
  }

  showMessage(message: string, duration: number = 5000) {
    this.snackBar.open(message, '', { duration });
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.records = this.data.slice(skip, skip + pageSize);
    this.currentPage = page;
  }

  editRecord(record: any) {
    const dialogRef = this.dialog.open(FormComponent, {
      data: record
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.data.findIndex(r => r._id === result._id);
        if (index !== -1) {
          this.data[index] = result;
          this.loadChannels();
        }
        
      }
    });
  }
}
