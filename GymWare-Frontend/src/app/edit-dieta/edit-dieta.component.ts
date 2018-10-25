import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DietaComidaDTO } from '../classes/DietaComidaDTO';
import { Comida } from '../classes/comida';
import { ComidaHelper } from '../classes/ComidaHelper';
import { MatTableDataSource, MatPaginator, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ComidaService } from '../services/comida.service';
import { DietaService } from '../services/dieta.service';
import { NgForm } from '@angular/forms';
import { Dieta } from '../classes/Dieta';
import { DietaComida } from '../classes/DietaComida';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-edit-dieta',
  templateUrl: './edit-dieta.component.html',
  styleUrls: ['./edit-dieta.component.css']
})
export class EditDietaComponent implements OnInit {

  private editedObject: DietaComidaDTO;
  enableEdit: Boolean;

  cboxComidas: Comida[];
  private selectedComidas: ComidaHelper[] = [];

  displayedColumns: string[] = ['Nombre', 'Calorias', 'DiasSemana', 'actions'];
  dataSource: MatTableDataSource<ComidaHelper>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private comidaService: ComidaService, 
    private dietaService: DietaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDietaComponent>) {
      this.enableEdit = data.edit;
      this.editedObject = data.editedObject;
      this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    if(this.enableEdit){
      this.getAllComidas();
    } else {
      this.displayedColumns = this.displayedColumns.splice(0,3);
    }
    this.setSelectedComidas();
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

  getAllComidas() {
    this.comidaService.getAll().subscribe(data => {
      this.cboxComidas = data;
    });
  }

  addComida(comidaHelper: ComidaHelper) {
    if (this.contains(comidaHelper.Comida.ComidaId) == -1) {
      this.selectedComidas.push(comidaHelper);
      this.reloadTable();
    }
  }

  removeComida(comidaId: number) {
    var index = this.contains(comidaId);
    if (index != -1) {
      this.selectedComidas.splice(index, 1);
      this.reloadTable();
    }
  }

  /**
   * Recibe un ID de ejercicio, recorre el array de los ejercicios que 
   * posee la rutina y retorna el indice de la primer ocurrencia del 
   * mismo o -1 si el ID no esta en la lista.
   * @param comidaId 
   */
  contains(comidaId: number): number {
    var comidaHelperList = [];
    comidaHelperList = this.selectedComidas.filter(item => item.Comida.ComidaId == comidaId);
    return this.selectedComidas.indexOf(comidaHelperList[0]);
  }

  setSelectedComidas(): void {
    this.editedObject.DietaComidas.forEach(item => {
      var comidaHelper = new ComidaHelper();
      comidaHelper.Comida = item.Comida;
      comidaHelper.DiasSemana = item.DiasSemana;
      this.selectedComidas.push(comidaHelper);
    });
  }

  reloadTable(): void {
    this.dataSource.data = this.selectedComidas;
    this.dataSource.connect();
  }

  onSubmit(f: NgForm) {
    var dietaComidasDTO = new DietaComidaDTO();
    dietaComidasDTO.Dieta = this.setDietaAtributes(f);
    dietaComidasDTO.DietaComidas = this.setDietaComidasList(f);

    if(this.enableEdit){
      this.dietaService.update(dietaComidasDTO as DietaComidaDTO).subscribe( 
        data => { 
          this.dialogRef.close(data);
        }, 
        error => alert(error) 
      ); 
    } 
  }

  setDietaAtributes(f: NgForm): Dieta {
    var dieta = new Dieta();
    dieta.DietaId = this.editedObject.Dieta.DietaId;
    dieta.Nombre = f.value.Nombre;
    dieta.Descripcion = f.value.Descripcion;
    return dieta;
  }

  setDietaComidasList(f: NgForm): DietaComida[] {
    var dietaComidaList: DietaComida[] = [];
    this.selectedComidas.forEach(item => {
      var dietaComida = new DietaComida();
      dietaComida.Comida = item.Comida;
      dietaComida.DiasSemana = item.DiasSemana;
      dietaComidaList.push(dietaComida);
    });
    return dietaComidaList;
  }

  onSubmitComida(f: NgForm) {
    var comida = new Comida();
    comida.ComidaId = f.value.cboxComidas.ComidaId;
    comida.Nombre = f.value.cboxComidas.Nombre;
    comida.Descripcion = f.value.cboxComidas.Descripcion;
    comida.Calorias = f.value.Calorias;
    var comidaHelper = new ComidaHelper();
    comidaHelper.Comida = comida;
    comidaHelper.DiasSemana = f.value.DiasSemana;
    this.addComida(comidaHelper);
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

    var dieta = {
      "nombreDieta": this.editedObject.Dieta.Nombre,
      "descripcionDieta": this.editedObject.Dieta.Descripcion,
    }

    rows.push(dieta);

    this.editedObject.DietaComidas.forEach(element => {
      var comida = {
        "comida": element.Comida.Nombre,
        "descripcionComida": element.Comida.ComidaId,
        "diasSemana": element.DiasSemana,
        "calorias": element.Comida.Calorias
      }  
      rows.push(comida);
    });

    // Only pt supported (not mm or in)
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.save('Dieta-' + this.editedObject.Dieta.Nombre + '.pdf');
  }

}
