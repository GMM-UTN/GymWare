import { Component, OnInit, ViewChild, Injectable, Output, EventEmitter, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DietaComidaDTO } from '../classes/DietaComidaDTO';
import { DeleteDialogBoxComponent } from '../delete-dialog-box/delete-dialog-box.component';
import { DietaService } from 'src/app/services/dieta.service';
import { AltaDietaComponent } from 'src/app/alta-dieta/alta-dieta.component';
import { EditDietaComponent } from 'src/app/edit-dieta/edit-dieta.component';
import { Dieta } from '../classes/Dieta';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-abm-dieta',
  templateUrl: './abm-dieta.component.html',
  styleUrls: ['./abm-dieta.component.css']
})
export class AbmDietaComponent implements OnInit {

  @Input() onlyCheck: Boolean;
  @Output() dieta = new EventEmitter<Dieta>();

  displayedColumns: string[] = ['Nombre', 'Descripcion', 'actions', 'add'];
  dataSource: MatTableDataSource<DietaComidaDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dietaService: DietaService,
    public dialog: MatDialog,
    public toastr: ToastrManager) {
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
    const dialogRef = this.dialog.open(AltaDietaComponent,{
      height: '60%',
      width: '70%',
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
    const dialogRef = this.dialog.open(EditDietaComponent, 
      {
        height: '60%',
        width: '70%',
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

  selectDieta(dieta: Dieta) {
    this.dieta.emit(dieta);
  }

  delete(id: number): void {
    this.dietaService.delete(id).subscribe( data => {
      this.toastr.successToastr('Dieta eliminada', 'Exito')
      this.refresh();
    },
    error => this.toastr.errorToastr(error, 'Error')
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

  print() {
    var columns = [
      {title: "Nombre de la dieta", dataKey: "nombreDieta"},
      {title: "Descripcion de la dieta", dataKey: "descripcionDieta"},
      {title: "Comida", dataKey: "comida"},
      {title: "Descripción", dataKey: "descripcionComida"},
      {title: "Días por semana", dataKey: "diasSemana"},
      {title: "Calorías", dataKey: "calorias"}
    ];
    var rows = [];

    for (let i = 0; i < this.dataSource.data.length; i++) {
      var dieta = {
        "nombreDieta": this.dataSource.data[i].Dieta.Nombre,
        "descripcionDieta": this.dataSource.data[i].Dieta.Descripcion,
      }

      rows.push(dieta);
      this.dataSource.data[i].DietaComidas.forEach(element => {
        var comida = {
          "comida": element.Comida.Nombre,
          "descripcionComida": element.Comida.ComidaId,
          "diasSemana": element.DiasSemana,
          "calorias": element.Comida.Calorias
        }  
        rows.push(comida);
      });
      
    }

    // Only pt supported (not mm or in)
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.save('Dietas.pdf');
  }
}
