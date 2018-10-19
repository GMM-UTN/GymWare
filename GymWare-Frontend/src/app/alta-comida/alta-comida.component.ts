import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { MatDialogRef } from '@angular/material';
import { ComidaService } from '../services/comida.service';
import { Comida } from '../classes/comida';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-alta-comida',
  templateUrl: './alta-comida.component.html',
  styleUrls: ['./alta-comida.component.css']
})
export class AltaComidaComponent implements OnInit {

  editedObject: Comida;

  constructor(private comidaService: ComidaService,
              public toastr: ToastrManager,
              public dialogRef: MatDialogRef<AltaComidaComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm){ 
    var editedObject = new Comida(); 
    editedObject.ComidaId = 0; 
    editedObject.Nombre = f.value.Nombre;
    editedObject.Descripcion = f.value.Descripcion; 
    editedObject.Calorias = f.value.Calorias;
    this.comidaService.save(editedObject).subscribe( 
      data => { 
         this.editedObject = data
      }, 
      error => this.toastr.errorToastr(error, 'Error') 
    ); 
    this.closeDialog();
  } 
}

