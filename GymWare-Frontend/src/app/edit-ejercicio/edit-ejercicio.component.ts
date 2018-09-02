import { Component, OnInit, Inject } from '@angular/core';
import { EjercicioService } from '../services/ejercicio.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Ejercicio } from '../classes/ejercicio';

@Component({
  selector: 'app-edit-ejercicio',
  templateUrl: './edit-ejercicio.component.html',
  styleUrls: ['./edit-ejercicio.component.css']
})
export class EditEjercicioComponent implements OnInit {

  editedObject: Ejercicio;
  enableEdit: Boolean;

  constructor(
    private ejercicioService: EjercicioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditEjercicioComponent>) {
      this.enableEdit = data.edit;
     }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm): void{
    var ejercicio = new Ejercicio();
    ejercicio.EjercicioId = this.data.editedObject.EjercicioId;
    ejercicio.Descripcion = f.value.Descripcion;
    this.ejercicioService.update(ejercicio as Ejercicio).subscribe( 
      data => { 
        this.dialogRef.close(data);
      }, 
      error => alert(error) 
    ); 
    
  }
}
