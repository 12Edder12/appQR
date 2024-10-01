import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ITracking {
  id: number;
  status: string;
}

@Component({
  selector: 'qr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  group: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITracking
  ) {
    this.title = data ? 'Editar Seguimiento' : 'Nuevo Seguimiento';
    this.group = this.fb.group({
      // Eliminar el campo `id` del formulario para no editarlo.
      status: [data?.status || '', Validators.required]
    });
  }

  save() {
    if (this.group.valid) {
      this.dialogRef.close(this.group.value);
    }
  }
}
