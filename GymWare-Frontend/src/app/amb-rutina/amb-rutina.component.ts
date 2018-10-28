import { Component, OnInit, Injectable, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { RutinaService } from '../services/rutina.service';
import { AltaRutinaComponent } from 'src/app/alta-rutina/alta-rutina.component';
import { DeleteDialogBoxComponent } from 'src/app/delete-dialog-box/delete-dialog-box.component';
import { RutinaEjerciciosDTO } from '../classes/rutinaEjerciciosDTO';
import { EditRutinaComponent } from 'src/app/edit-rutina/edit-rutina.component';
import { Rutina } from 'src/app/classes/rutina';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-amb-rutina',
  templateUrl: './amb-rutina.component.html',
  styleUrls: ['./amb-rutina.component.css']
})
export class AmbRutinaComponent implements OnInit {

  @Input() onlyCheck: Boolean;
  @Output() rutina = new EventEmitter<Rutina>();

  displayedColumns: string[] = ['Nombre', 'Tipo', 'actions', 'add'];
  dataSource: MatTableDataSource<RutinaEjerciciosDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private rutinaService: RutinaService,
    public dialog: MatDialog,
    private toastr: ToastrManager) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.getAll();
    this.dataSource.filterPredicate = function (data, filter): boolean {
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
    const dialogRef = this.dialog.open(AltaRutinaComponent,{
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
      if (result) {
        this.delete(id);
        this.getAll();
        this.dataSource.connect();
      }
    });
  }

  openDialogModification(editedObject: any, edit: Boolean) {
    const dialogRef = this.dialog.open(EditRutinaComponent,
      {
        height: '60%',
        width: '70%',
        data:
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

  delete(id: number): void {
    this.rutinaService.delete(id).subscribe(data => {
      this.toastr.successToastr('Rutina eliminada', 'Exito')
      this.refresh();
    },
      error => this.toastr.errorToastr(error, 'Error')
    );
  }

  getAll(): void {
    this.rutinaService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  private refresh(): void {
    this.getAll();
    this.dataSource.connect();
  }

  selectRutina(rutina: Rutina) {
    this.rutina.emit(rutina);
  }

  print() {
    var columns = [
      { title: "Nombre de la rutina", dataKey: "nombreRutina" },
      { title: "Descripcion", dataKey: "descripcionRutina" },
      { title: "Tipo", dataKey: "tipo" },
      { title: "Edad mínima", dataKey: "edadMinima" },
      { title: "Edad máxima", dataKey: "edadMaxima" },
      { title: "Sexo", dataKey: "sexo" },
      { title: "Ejercicio", dataKey: "ejercicio" },
      { title: "Repeticiones", dataKey: "repeticiones" },
      { title: "Series", dataKey: "series" },
    ];
    var rows = [];

    for (let i = 0; i < this.dataSource.data.length; i++) {
      var dieta = {
        "nombreRutina": this.dataSource.data[i].Rutina.Nombre,
        "descripcionRutina": this.dataSource.data[i].Rutina.Descripcion,
        "tipo": this.dataSource.data[i].Rutina.Tipo,
        "edadMinima": this.dataSource.data[i].Rutina.EdadMinima,
        "edadMaxima": this.dataSource.data[i].Rutina.EdadMaxima,
        "sexo": this.dataSource.data[i].Rutina.Sexo
      }

      rows.push(dieta);
      this.dataSource.data[i].RutinaEjercicios.forEach(element => {
        var ejercicio = {
          "ejercicio": element.Ejercicio.Descripcion,
          "repeticiones": element.Repeticiones,
          "series": element.Series,
        }
        rows.push(ejercicio);
      });

    }

    // Only pt supported (not mm or in)
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {
      styles: { overflow: 'linebreak' },
      columnStyles: {
        nombreRutina: { columnWidth: 80 },
        descripcionRutina: { columnWidth: 80 },
        edadMinima: { columnWidth: 50 },
        edadMaxima: { columnWidth: 50 },
        repeticiones: { columnWidth: 50 }
      }
    });
    doc.save('Rutinas.pdf');
  }

}
