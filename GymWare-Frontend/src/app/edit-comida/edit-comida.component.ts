import { Component, OnInit, Inject } from '@angular/core';
import { Comida } from '../classes/comida';
import { ComidaService } from '../services/comida.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-comida',
  templateUrl: './edit-comida.component.html',
  styleUrls: ['./edit-comida.component.css']
})
export class EditComidaComponent implements OnInit {

  editedObject: Comida;
  enableEdit: Boolean;

  constructor(
    private comidaService: ComidaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditComidaComponent>) {
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
    var comida = new Comida();
    comida.ComidaId = this.data.editedObject.ComidaId;
    comida.Nombre = f.value.Nombre;
    comida.Descripcion = f.value.Descripcion;
    comida.Calorias = f.value.Calorias;
    this.comidaService.update(comida as Comida).subscribe( 
      data => { 
        this.dialogRef.close(data);
      }, 
      error => alert(error) 
    ); 
    
  }

}
