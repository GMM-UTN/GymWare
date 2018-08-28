import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { RutinaService } from '../services/rutina.service';
import { AltaRutinaComponent } from 'src/app/alta-rutina/alta-rutina.component';
import { DeleteDialogBoxComponent } from 'src/app/delete-dialog-box/delete-dialog-box.component';
import { RutinaEjerciciosDTO } from '../classes/rutinaEjerciciosDTO';

const initialSelection = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-amb-rutina',
  templateUrl: './amb-rutina.component.html',
  styleUrls: ['./amb-rutina.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AmbRutinaComponent implements OnInit {

  selection = new SelectionModel<any>(allowMultiSelect, initialSelection);
  displayedColumns: string[] = ['select','RutinaId', 'Nombre', 'Tipo', 'actions', 'add'];
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
    console.log(this.dataSource.data);
  }

  ngAfterViewInit() {
    this.getAll();
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
    const dialogRef = this.dialog.open(AltaRutinaComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
      this.dataSource.connect();
    });
  }

  openDialogBaja(id: number) {
    console.log(id);
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

  delete(id: number): void {
    this.rutinaService.delete(id).subscribe( data => {
      this.refresh();
    },
    error => alert(error)
    );
  }

  getAll():void {
    this.rutinaService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data + ' get all');
    });
  }

  private refresh(): void {
    this.getAll();
    this.dataSource.connect();
}

}
