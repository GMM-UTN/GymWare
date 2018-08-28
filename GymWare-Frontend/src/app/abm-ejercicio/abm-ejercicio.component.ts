import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Ejercicio } from '../classes/ejercicio';
import { EjercicioService } from '../services/ejercicio.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AltaEjercicioComponent } from '../alta-ejercicio/alta-ejercicio.component';
import { DeleteDialogBoxComponent } from '../delete-dialog-box/delete-dialog-box.component';
import { EditEjercicioComponent } from '../edit-ejercicio/edit-ejercicio.component';
import { EditRutinaComponent } from '../edit-rutina/edit-rutina.component';

  const initialSelection = [];
  const allowMultiSelect = true;

@Component({
  selector: 'app-abm-ejercicio',
  templateUrl: './abm-ejercicio.component.html',
  styleUrls: ['./abm-ejercicio.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AbmEjercicioComponent implements OnInit {

  selection = new SelectionModel<Ejercicio>(allowMultiSelect, initialSelection);
  displayedColumns: string[] = ['select','EjercicioId','Descripcion', 'actions', 'add'];
  dataSource: MatTableDataSource<Ejercicio>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ejercicioService: EjercicioService, public dialog: MatDialog) { 
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }
  
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  openDialogAlta() {
    const dialogRef = this.dialog.open(AltaEjercicioComponent);

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
    const dialogRef = this.dialog.open(EditRutinaComponent, 
      {data :
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
    this.ejercicioService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, 
    error => alert(error)
    ); 
  }

  delete(id: number): void {
    this.ejercicioService.delete(id).subscribe( data => {
      this.refresh();
    },
    error => alert(error)
    );
  }
}
