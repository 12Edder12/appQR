import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'qr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  title = "";
  group!: FormGroup;

  constructor(
    private reference: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.title = data ? "EDITAR QUEJA" : "NUEVA QUEJA";
  }

  ngOnInit() {
    this.loadForm();
  }

  save() {
    const record = this.group.value;
    this.reference.close(record);
  }

  loadForm() {
    this.group = new FormGroup({
      id: new FormControl(this.data?.id),
      id_cliente: new FormControl(this.data?.id_cliente, Validators.required),
      id_empleado: new FormControl(this.data?.id_empleado, Validators.required),
      id_seguimiento: new FormControl(this.data?.id_seguimiento, Validators.required),
      fecha: new FormControl(this.data?.fecha, Validators.required),
    });
  }
}
