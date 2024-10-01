import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IComplaint {
  id: number;
  id_cliente: number;
  id_empleado: number;
  id_seguimiento: number;
  fecha: string;
}

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: IComplaint[] = [
    { id: 1, id_cliente: 101, id_empleado: 201, id_seguimiento: 301, fecha: '2024-01-01' },
    { id: 2, id_cliente: 102, id_empleado: 202, id_seguimiento: 302, fecha: '2024-01-02' },
    { id: 3, id_cliente: 103, id_empleado: 203, id_seguimiento: 303, fecha: '2024-01-03' },
    { id: 4, id_cliente: 104, id_empleado: 204, id_seguimiento: 304, fecha: '2024-01-04' },
    { id: 5, id_cliente: 105, id_empleado: 205, id_seguimiento: 305, fecha: '2024-01-05' },
    { id: 6, id_cliente: 106, id_empleado: 206, id_seguimiento: 306, fecha: '2024-01-06' },
    { id: 7, id_cliente: 107, id_empleado: 207, id_seguimiento: 307, fecha: '2024-01-07' },
    { id: 8, id_cliente: 108, id_empleado: 208, id_seguimiento: 308, fecha: '2024-01-08' },
    { id: 9, id_cliente: 109, id_empleado: 209, id_seguimiento: 309, fecha: '2024-01-09' },
    { id: 10, id_cliente: 110, id_empleado: 210, id_seguimiento: 310, fecha: '2024-01-10' },
    { id: 11, id_cliente: 111, id_empleado: 211, id_seguimiento: 311, fecha: '2024-01-11' },
    { id: 12, id_cliente: 112, id_empleado: 212, id_seguimiento: 312, fecha: '2024-01-12' },
    { id: 13, id_cliente: 113, id_empleado: 213, id_seguimiento: 313, fecha: '2024-01-13' },
    { id: 14, id_cliente: 114, id_empleado: 214, id_seguimiento: 314, fecha: '2024-01-14' },
    { id: 15, id_cliente: 115, id_empleado: 215, id_seguimiento: 315, fecha: '2024-01-15' },
  ];

  metaDataColumns: MetaDataColumn[] = [
    { field: "id", title: "ID" },
    { field: "id_cliente", title: "ID CLIENTE" },
    { field: "id_empleado", title: "ID EMPLEADO" },
    { field: "id_seguimiento", title: "ID SEGUIMIENTO" },
    { field: "fecha", title: "FECHA" }
  ];

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  records: IComplaint[] = [];
  totalRecords = this.data.length;
  currentPage = 0;

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.loadComplaints();
  }

  loadComplaints() {
    this.records = [...this.data];
    this.changePage(this.currentPage);
  }

  editRecord(row: IComplaint) {
    this.openForm(row);
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind.id === id);
    if (position !== -1) {
      this.data.splice(position, 1);
      this.totalRecords = this.data.length;
      this.loadComplaints();
    }
  }

  openForm(row: IComplaint | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };
    const reference: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, options);

    reference.afterClosed().subscribe((response) => {
      if (!response) { return; }
      if (response.id) {
        const index = this.data.findIndex(complaint => complaint.id === response.id);
        if (index !== -1) {
          this.data[index] = response;
        }
        this.totalRecords = this.data.length;
        this.loadComplaints();
        this.showMessage('Registro actualizado');
      } else {
        const newComplaint = { ...response, id: this.data.length + 1 };
        this.data.push(newComplaint);
        this.totalRecords = this.data.length;
        this.loadComplaints();
        this.showMessage('Registro exitoso');
      }
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet("Lista de Quejas", "quejas", this.data);
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
