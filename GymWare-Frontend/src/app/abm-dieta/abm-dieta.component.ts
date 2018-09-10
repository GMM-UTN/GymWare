import { Component, OnInit, ViewChild } from '@angular/core';
import { Comida } from '../classes/comida';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DietaComidaDTO } from '../classes/DietaComidaDTO';
import { DeleteDialogBoxComponent } from '../delete-dialog-box/delete-dialog-box.component';
import { DietaService } from 'src/app/services/dieta.service';
import { AltaDietaComponent } from 'src/app/alta-dieta/alta-dieta.component';
import { EditDietaComponent } from 'src/app/edit-dieta/edit-dieta.component';

@Component({
  selector: 'app-abm-dieta',
  templateUrl: './abm-dieta.component.html',
  styleUrls: ['./abm-dieta.component.css']
})
export class AbmDietaComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Descripcion', 'actions', 'add'];
  dataSource: MatTableDataSource<DietaComidaDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dietaService: DietaService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([]);
   }

  ngOnInit() {
    this.getAll();
    this.dataSource.filterPredicate = function(data, filter): boolean {
      return data.Dieta.Nombre.toLowerCase().includes(filter);
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
    const dialogRef = this.dialog.open(AltaDietaComponent);

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
    const dialogRef = this.dialog.open(EditDietaComponent, 
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
    this.dietaService.delete(id).subscribe( data => {
      this.refresh();
    },
    error => alert(error)
    );
  }

  getAll():void {
    this.dietaService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  private refresh(): void {
    this.getAll();
    this.dataSource.connect();
  }
}