import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Ejercicio } from '../classes/ejercicio';
import { EjercicioService } from '../services/ejercicio.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { AltaEjercicioComponent } from '../alta-ejercicio/alta-ejercicio.component';
import { DeleteDialogBoxComponent } from '../delete-dialog-box/delete-dialog-box.component';
import { EditEjercicioComponent } from '../edit-ejercicio/edit-ejercicio.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-abm-ejercicio',
  templateUrl: './abm-ejercicio.component.html',
  styleUrls: ['./abm-ejercicio.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AbmEjercicioComponent implements OnInit {

  displayedColumns: string[] = ['Descripcion', 'actions', 'add'];
  dataSource: MatTableDataSource<Ejercicio>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ejercicioService: EjercicioService, public dialog: MatDialog,
    public toastr: ToastrManager) { 
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {    
    this.getAll();    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogAlta() {
    const dialogRef = this.dialog.open(AltaEjercicioComponent, {
      height: '25%',
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
      this.dataSource.connect();
    });
  }

  openDialogBaja(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogBoxComponent,{
      height: '25%',
      width: '25%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete(id);
        this.getAll();
        this.dataSource.connect();
      }
    });
  }

  openDialogModification(editedObject: any, edit: Boolean) {
    const dialogRef = this.dialog.open(EditEjercicioComponent, 
      {
        height: '25%',
        width: '40%',
        data :
        { 
          editedObject: editedObject, 
          edit: edit
        }
      }
      
    );

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
      this.dataSource.connect();
    });
  }

  private refresh(): void {
      this.getAll();
      this.dataSource.connect();
  }

  getAll(): void {
    this.ejercicioService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, 
    error => this.toastr.errorToastr(error, 'Error')
    ); 
  }

  delete(id: number): void {
    this.ejercicioService.delete(id).subscribe( data => {
      this.toastr.successToastr('Ejercicio eliminado', 'Exito')
      this.refresh();
    },
    error => this.toastr.errorToastr(error, 'Error')
    );
  }

  print() {
    var columns = [
      {title: "Ejercicio", dataKey: "descripcion"}
    ];
    var rows = [];

    for (let i = 0; i < this.dataSource.data.length; i++) {
      var obj = {
        "descripcion": this.dataSource.data[i].Descripcion
      }

      rows.push(obj);
    }

    // Only pt supported (not mm or in)
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.save('Ejercicios.pdf');
  }
}
