import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rutina } from '../classes/rutina';
import { RutinaService } from '../services/rutina.service';
import { MatDialogRef, MatTableDataSource, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { Ejercicio } from 'src/app/classes/ejercicio';
import { EjercicioHelper } from '../classes/ejercicioHelper';
import { RutinaEjerciciosDTO } from '../classes/rutinaEjerciciosDTO';
import { RutinaEjercicio } from '../classes/rutinaEjercicio';

@Component({
  selector: 'app-edit-rutina',
  templateUrl: './edit-rutina.component.html',
  styleUrls: ['./edit-rutina.component.css']
})
export class EditRutinaComponent implements OnInit {

  private editedObject: RutinaEjerciciosDTO;
  enableEdit: Boolean;

  cboxEjercicios: Ejercicio[];
  private selectedEjercicios: EjercicioHelper[] = [];

  displayedColumns: string[] = ['Descripcion', 'Series', 'Repeticiones', 'actions'];
  dataSource: MatTableDataSource<EjercicioHelper>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private ejercicioService: EjercicioService, 
    private rutinaService: RutinaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditRutinaComponent>) {
      this.enableEdit = data.edit;
      this.editedObject = data.editedObject;
      this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    if(this.enableEdit){
      this.getAllEjercicios();
    } else {
      this.displayedColumns = this.displayedColumns.splice(0,3);
    }
    this.setSelectedEjercicios();
    this.reloadTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getAllEjercicios() {
    this.ejercicioService.getAll().subscribe(data => {
      this.cboxEjercicios = data;
    });
  }

  addEjercicio(ejercicioHelper: EjercicioHelper) {
    if (this.contains(ejercicioHelper.ejercicio.EjercicioId) == -1) {
      this.selectedEjercicios.push(ejercicioHelper);
      this.reloadTable();
    }
  }

  removeEjercicio(ejercicioId: number) {
    var index = this.contains(ejercicioId);
    if (index != -1) {
      this.selectedEjercicios.splice(index, 1);
      this.reloadTable();
    }
  }

  /**
   * Recibe un ID de ejercicio, recorre el array de los ejercicios que 
   * posee la rutina y retorna el indice de la primer ocurrencia del 
   * mismo o -1 si el ID no esta en la lista.
   * @param ejercicioId 
   */
  contains(ejercicioId: number): number {
    var ejercicioHelperList = [];
    ejercicioHelperList = this.selectedEjercicios.filter(item => item.ejercicio.EjercicioId == ejercicioId);
    return this.selectedEjercicios.indexOf(ejercicioHelperList[0]);
  }

  setSelectedEjercicios(): void {
    this.editedObject.RutinaEjercicios.forEach(item => {
      var ejercicioHelper = new EjercicioHelper();
      ejercicioHelper.ejercicio = item.Ejercicio;
      ejercicioHelper.series = item.Series;
      ejercicioHelper.repeticiones = item.Repeticiones;
      this.selectedEjercicios.push(ejercicioHelper);
    });
  }

  reloadTable(): void {
    this.dataSource.data = this.selectedEjercicios;
    this.dataSource.connect();
  }

  onSubmit(f: NgForm) {
    var rutinaEjerciciosDTO = new RutinaEjerciciosDTO();
    rutinaEjerciciosDTO.Rutina = this.setRutinaAtributes(f);
    rutinaEjerciciosDTO.RutinaEjercicios = this.setRutinaEjerciciosList(f);

    if(this.enableEdit){
      this.rutinaService.update(rutinaEjerciciosDTO as RutinaEjerciciosDTO).subscribe( 
        data => { 
          this.dialogRef.close(data);
        }, 
        error => alert(error) 
      ); 
    } 
  }

  setRutinaAtributes(f: NgForm): Rutina {
    var rutina = new Rutina();
    rutina.RutinaId = this.editedObject.Rutina.RutinaId;
    rutina.Nombre = f.value.Nombre;
    rutina.Tipo = f.value.Tipo;
    rutina.Descripcion = f.value.Descripcion;
    rutina.Sexo = f.value.Sexo;
    rutina.EdadMinima = f.value.EdadMinima;
    rutina.EdadMaxima = f.value.EdadMaxima;
    return rutina;
  }

  setRutinaEjerciciosList(f: NgForm): RutinaEjercicio[] {
    var rutinaEjercicioList: RutinaEjercicio[] = [];
    this.selectedEjercicios.forEach(item => {
      var rutinaEjercicio = new RutinaEjercicio();
      rutinaEjercicio.Ejercicio = item.ejercicio;
      rutinaEjercicio.Series = item.series;
      rutinaEjercicio.Repeticiones = item.repeticiones;
      rutinaEjercicioList.push(rutinaEjercicio);
    });
    return rutinaEjercicioList;
  }

  onSubmitEjercicio(f: NgForm) {
    var ejercicio = new Ejercicio();
    ejercicio.EjercicioId = f.value.cboxEjercicios.EjercicioId;
    ejercicio.Descripcion = f.value.cboxEjercicios.Descripcion;
    var ejercicioHelper = new EjercicioHelper();
    ejercicioHelper.ejercicio = ejercicio;
    ejercicioHelper.series = f.value.Series;
    ejercicioHelper.repeticiones = f.value.Repeticiones;
    this.addEjercicio(ejercicioHelper);
  }

}
