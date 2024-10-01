import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';

export interface ITracking {
  id: number;
  status: string;
}

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: ITracking[] = [
    { id: 1, status: 'activo' },
    { id: 2, status: 'inactivo' },
    { id: 3, status: 'activo' },
    { id: 4, status: 'inactivo' },
    { id: 5, status: 'activo' },
    { id: 6, status: 'activo' },
    { id: 7, status: 'inactivo' },
    { id: 8, status: 'activo' },
    { id: 9, status: 'inactivo' },
    { id: 10, status: 'activo' },
    { id: 11, status: 'activo' },
    { id: 12, status: 'inactivo' },
    { id: 13, status: 'activo' },
    { id: 14, status: 'inactivo' },
    { id: 15, status: 'activo' }
  ];

  metaDataColumns: MetaDataColumn[] = [
    { field: "id", title: "ID" },
    { field: "status", title: "ESTADO" }
  ];

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  records: ITracking[] = [];
  totalRecords = this.data.length;
  currentPage = 0;

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.loadRecords();
  }

  loadRecords() {
    this.records = [...this.data];
    this.changePage(this.currentPage);
  }

  editRecord(row: ITracking) {
    this.openForm(row);
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind.id === id);
    if (position !== -1) {
      this.data.splice(position, 1);
      this.totalRecords = this.data.length;
      this.loadRecords();
      this.showMessage('Registro eliminado');
    }
  }

  openForm(row: ITracking | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };
    const reference: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, options);

    reference.afterClosed().subscribe((response) => {
      if (!response) { return; }

      if (!row) {
        // Crear un nuevo registro con un ID único basado en el valor más alto de la lista
        const newId = this.data.length > 0 ? Math.max(...this.data.map(item => item.id)) + 1 : 1;
        const newTracking = { id: newId, ...response };
        this.data.push(newTracking);
        this.totalRecords = this.data.length;
        this.loadRecords();
        this.showMessage('Registro exitoso');
      } else {
        // Editar el registro existente
        const index = this.data.findIndex(track => track.id === row.id);
        if (index !== -1) {
          this.data[index] = { ...row, ...response };
          this.totalRecords = this.data.length;
          this.loadRecords();
          this.showMessage('Registro actualizado');
        }
      }
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet("Lista de Seguimientos", "seguimientos", this.data);
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
}
