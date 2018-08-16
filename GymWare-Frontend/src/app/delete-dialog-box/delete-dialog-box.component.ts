import { Component, OnInit } from '@angular/core';
import { EjercicioService } from '../services/ejercicio.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-dialog-box',
  templateUrl: './delete-dialog-box.component.html',
  styleUrls: ['./delete-dialog-box.component.css']
})
export class DeleteDialogBoxComponent implements OnInit {

  editedObject: any;

  constructor(private ejercicioService: EjercicioService,
    public dialogRef: MatDialogRef<DeleteDialogBoxComponent>) {
     }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  closeDialog(option: boolean) {
    this.dialogRef.close(option);
  }

}
