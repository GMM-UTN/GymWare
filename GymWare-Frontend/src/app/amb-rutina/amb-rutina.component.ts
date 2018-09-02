import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { RutinaService } from '../services/rutina.service';
import { AltaRutinaComponent } from 'src/app/alta-rutina/alta-rutina.component';
import { DeleteDialogBoxComponent } from 'src/app/delete-dialog-box/delete-dialog-box.component';
import { RutinaEjerciciosDTO } from '../classes/rutinaEjerciciosDTO';
import { EditRutinaComponent } from 'src/app/edit-rutina/edit-rutina.component';


@Component({
  selector: 'app-amb-rutina',
  templateUrl: './amb-rutina.component.html',
  styleUrls: ['./amb-rutina.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AmbRutinaComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Tipo', 'actions', 'add'];
  dataSource: MatTableDataSource<RutinaEjerciciosDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private rutinaService: RutinaService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([]);
   }

  ngOnInit() {
    this.getAll();
    this.dataSource.filterPredicate = function(data, filter): boolean {
      return data.Rutina.Nombre.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogAlta() {
    const dialogRef = this.dialog.open(AltaRutinaComponent);

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

  delete(id: number): void {
    this.rutinaService.delete(id).subscribe( data => {
      this.refresh();
    },
    error => alert(error)
    );
  }

  getAll():void {
    this.rutinaService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  private refresh(): void {
    this.getAll();
    this.dataSource.connect();
  }

}
