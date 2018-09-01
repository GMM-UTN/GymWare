import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rutina } from '../classes/rutina';
import { RutinaService } from '../services/rutina.service';
import { MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { Ejercicio } from 'src/app/classes/ejercicio';
import { EjercicioHelper } from '../classes/ejercicioHelper';
import { RutinaEjerciciosDTO } from '../classes/rutinaEjerciciosDTO';
import { RutinaEjercicio } from '../classes/rutinaEjercicio';

@Component({
  selector: 'app-alta-rutina',
  templateUrl: './alta-rutina.component.html',
  styleUrls: ['./alta-rutina.component.css']
})
export class AltaRutinaComponent implements OnInit {

  ejercicios: Ejercicio[];
  selectedEjercicios: EjercicioHelper[] = [];
  rutina: any;
  displayedColumns: string[] = ['EjercicioId', 'Descripcion', 'Series', 'Repeticiones', 'actions'];
  dataSource: MatTableDataSource<EjercicioHelper>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    rutinaservice: RutinaService,
    private ejercicioService: EjercicioService,
    private rutinaService: RutinaService,
    public dialogRef: MatDialogRef<AltaRutinaComponent>) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.getAllEjercicios();
    console.log(this.ejercicios);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllEjercicios();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getAllEjercicios() {
    this.ejercicioService.getAll().subscribe(data => {
      this.ejercicios = data;
    });
  }

  addEjercicio(ejercicioHelper: EjercicioHelper) {
    if (this.contains(ejercicioHelper.ejercicio.EjercicioId) == null) {
      this.selectedEjercicios.push(ejercicioHelper);
      this.dataSource.data = this.selectedEjercicios;
      this.dataSource.connect();
    }
  }

  removeEjercicio(EjercicioId: number) {
    var index = this.contains(EjercicioId);
    console.log(index);
    if (index != null) {
      this.selectedEjercicios.splice(index, 1);
      this.dataSource.data = this.selectedEjercicios;
      this.dataSource.connect();
    }
  }

  contains(EjercicioId: number): number {
    var index = null;
    for (let item of this.selectedEjercicios) {
      if (item.ejercicio.EjercicioId == EjercicioId) {
        index = this.selectedEjercicios.indexOf(item);
        break;
      }
    }
    return index;
  }

  onSubmit(f: NgForm) {
    var rutina = new Rutina();
    rutina.Nombre = f.value.Nombre;
    rutina.Tipo = f.value.Tipo;
    rutina.Descripcion = f.value.Descripcion;
    rutina.Sexo = f.value.Sexo;
    rutina.EdadMinima = f.value.EdadMinima;
    rutina.EdadMaxima = f.value.EdadMaxima;

    var rutinaEjercicioList: RutinaEjercicio[] = [];
    this.selectedEjercicios.forEach(item => {
      var rutinaEjercicio = new RutinaEjercicio();
      rutinaEjercicio.Ejercicio = item.ejercicio;
      rutinaEjercicio.Series = item.series;
      rutinaEjercicio.Repeticiones = item.repeticiones;
      rutinaEjercicioList.push(rutinaEjercicio);
      console.log(rutinaEjercicio);
    });

    console.log(rutinaEjercicioList);

    var rutinaEjerciciosDTO = new RutinaEjerciciosDTO();
    rutinaEjerciciosDTO.Rutina = rutina;
    rutinaEjercicioList.forEach(e => {
      rutinaEjerciciosDTO.RutinaEjercicios.push(e);
    })
    
    this.rutinaService.save(rutinaEjerciciosDTO).subscribe(data => {
      console.log(data);
    },
    error => alert(error)
    );
  }

  onSubmitEjercicio(f: NgForm) {
    var ejercicio = new Ejercicio();
    ejercicio.EjercicioId = f.value.ejercicioSelect.EjercicioId;
    ejercicio.Descripcion = f.value.ejercicioSelect.Descripcion;
    var ejercicioHelper = new EjercicioHelper();
    ejercicioHelper.ejercicio = ejercicio;
    ejercicioHelper.series = f.value.Series;
    ejercicioHelper.repeticiones = f.value.Repeticiones;
    console.log(ejercicioHelper);
    this.addEjercicio(ejercicioHelper);
  }

}
