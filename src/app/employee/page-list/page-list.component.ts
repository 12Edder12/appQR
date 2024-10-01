import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IEmployee {
  id: number;
  name: string;
  position: string;
  address: string;
  phone: string;
}


@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: IEmployee[] = [
    { id: 1, name: 'Juan Pérez', position: 'Gerente', address: 'Calle 1', phone: '123456789' },
    { id: 2, name: 'María López', position: 'Asistente', address: 'Calle 2', phone: '987654321' },
    { id: 3, name: 'Carlos Sánchez', position: 'Desarrollador', address: 'Calle 3', phone: '456789123' },
    { id: 4, name: 'Ana Torres', position: 'Diseñadora', address: 'Calle 4', phone: '321654987' },
    { id: 5, name: 'Luis Gómez', position: 'Analista', address: 'Calle 5', phone: '654321789' },
    { id: 6, name: 'Elena Morales', position: 'Tester', address: 'Calle 6', phone: '789123456' },
    { id: 7, name: 'Miguel Ángel', position: 'Director', address: 'Calle 7', phone: '147258369' },
    { id: 8, name: 'Julia Romero', position: 'Recursos Humanos', address: 'Calle 8', phone: '258369147' },
    { id: 9, name: 'Raúl Castro', position: 'Marketing', address: 'Calle 9', phone: '369147258' },
    { id: 10, name: 'Sofia Rivas', position: 'Finanzas', address: 'Calle 10', phone: '963852741' },
    { id: 11, name: 'Victor Martínez', position: 'Ventas', address: 'Calle 11', phone: '852963741' },
    { id: 12, name: 'Patricia Vargas', position: 'Contabilidad', address: 'Calle 12', phone: '741258963' },
    { id: 13, name: 'Andrés Díaz', position: 'Soporte', address: 'Calle 13', phone: '159753486' },
    { id: 14, name: 'Camila Salazar', position: 'Investigadora', address: 'Calle 14', phone: '753159864' },
    { id: 15, name: 'Jorge Salgado', position: 'Secretario', address: 'Calle 15', phone: '258147963' },
  ];
  
  metaDataColumns: MetaDataColumn[] = [
    { field: "id", title: "ID" },
    { field: "name", title: "NOMBRE" },
    { field: "position", title: "CARGO" },
    { field: "address", title: "DIRECCIÓN" },
    { field: "phone", title: "TELÉFONO" }
  ];
  
  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];
  
  records: IEmployee[] = [];
  totalRecords = this.data.length;
  currentPage = 0;

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.records = [...this.data];
    this.changePage(this.currentPage);
  }

  editRecord(row: IEmployee) {
    this.openForm(row);
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind.id === id);
    if (position !== -1) {
      this.data.splice(position, 1);
      this.totalRecords = this.data.length;
      this.loadEmployees();
    }
  }

  openForm(row: IEmployee | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };
    const reference: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, options);

    reference.afterClosed().subscribe((response) => {
      if (!response) { return; }
      if (response.id) {
        const index = this.data.findIndex(employee => employee.id === response.id);
        if (index !== -1) {
          this.data[index] = response;
        }
        this.totalRecords = this.data.length;
        this.loadEmployees();
        this.showMessage('Registro actualizado');
      } else {
        const newEmployee = { ...response, id: this.data.length + 1 };
        this.data.push(newEmployee);
        this.totalRecords = this.data.length;
        this.loadEmployees();
        this.showMessage('Registro exitoso');
      }
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet("Lista de Empleados", "empleados", this.data);
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
