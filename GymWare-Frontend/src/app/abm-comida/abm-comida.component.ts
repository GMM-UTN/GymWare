import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Comida } from '../classes/comida';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { AltaEjercicioComponent } from '../alta-ejercicio/alta-ejercicio.component';
import { DeleteDialogBoxComponent } from '../delete-dialog-box/delete-dialog-box.component';
import { EditEjercicioComponent } from '../edit-ejercicio/edit-ejercicio.component';
import { ComidaService } from '../services/comida.service';
import { AltaComidaComponent } from '../alta-comida/alta-comida.component';
import { EditComidaComponent } from '../edit-comida/edit-comida.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-abm-comida',
  templateUrl: './abm-comida.component.html',
  styleUrls: ['./abm-comida.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AbmComidaComponent implements OnInit {

  displayedColumns: string[] = ['Nombre','Descripcion', 'Calorias', 'actions', 'add'];
  dataSource: MatTableDataSource<Comida>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private comidaService: ComidaService, 
    public dialog: MatDialog,
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
    const dialogRef = this.dialog.open(AltaComidaComponent,{
      height: '40%',
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
      this.dataSource.connect();
    });
  }

  openDialogBaja(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogBoxComponent
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete(id);
        this.getAll();
        this.dataSource.connect();
      }
    });
  }

  openDialogModification(editedObject: any, edit: Boolean) {
    const dialogRef = this.dialog.open(EditComidaComponent, 
      { 
        height: '40%',
        width: '50%',
        data :
        { editedObject: editedObject, 
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
    this.comidaService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, 
    error => this.toastr.errorToastr(error, 'Error')
    ); 
  }

  delete(id: number): void {
    this.comidaService.delete(id).subscribe( data => {
      this.toastr.successToastr('Comida eliminada', 'Exito')
      this.refresh();
    },
    error => this.toastr.errorToastr(error, 'Error')
    );
  }

  print() {
    var columns = [
      {title: "Nombre", dataKey: "nombre"},
      {title: "Descripcion", dataKey: "descripcion"},
      {title: "Calorías", dataKey: "calorias"}
    ];
    var rows = [];

    for (let i = 0; i < this.dataSource.data.length; i++) {
      var obj = {
        "nombre": this.dataSource.data[i].Nombre,
        "descripcion": this.dataSource.data[i].Descripcion,
        "calorias": this.dataSource.data[i].Calorias
      }

      rows.push(obj);
    }

    // Only pt supported (not mm or in)
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.save('Comidas.pdf');
  }
}