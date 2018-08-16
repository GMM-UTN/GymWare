import { Component, OnInit, Inject } from '@angular/core';
import { EjercicioService } from '../services/ejercicio.service';
import { Ejercicio } from '../classes/ejercicio';
import {NgForm} from '@angular/forms'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alta-ejercicio',
  templateUrl: './alta-ejercicio.component.html',
  styleUrls: ['./alta-ejercicio.component.css']
})
export class AltaEjercicioComponent implements OnInit {

  editedObject: Ejercicio;

  constructor(private ejercicioService: EjercicioService,
              public dialogRef: MatDialogRef<AltaEjercicioComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm){ 
    var editedObject = new Ejercicio(); 
    editedObject.setId(0); 
    editedObject.setDescripcion(f.value.Descripcion); 
    this.ejercicioService.save(editedObject).subscribe( 
      data => { 
         this.editedObject = data
      }, 
      error => alert(error) 
    ); 
    this.closeDialog();
  } 
}
