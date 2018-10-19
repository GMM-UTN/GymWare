import { Component, OnInit, ViewChild } from '@angular/core';
import { Comida } from '../classes/comida';
import { ComidaHelper } from '../classes/ComidaHelper';
import { MatTableDataSource, MatPaginator, MatDialogRef } from '@angular/material';
import { ComidaService } from '../services/comida.service';
import { DietaService } from '../services/dieta.service';
import { NgForm } from '@angular/forms';
import { DietaComidaDTO } from '../classes/DietaComidaDTO';
import { Dieta } from '../classes/Dieta';
import { DietaComida } from '../classes/DietaComida';
import { AuthenticationService } from '../services';
import { Empleado } from '../classes/Empleado';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-alta-dieta',
  templateUrl: './alta-dieta.component.html',
  styleUrls: ['./alta-dieta.component.css']
})
export class AltaDietaComponent implements OnInit {

  cboxComidas: Comida[];
  private selectedComidas: ComidaHelper[] = [];
  
  displayedColumns: string[] = ['Nombre', 'Calorias', 'DiasSemana', 'actions'];
  dataSource: MatTableDataSource<ComidaHelper>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private comidaService: ComidaService,
    private dietaService: DietaService,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<AltaDietaComponent>,
    public toastr: ToastrManager) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    console.log("init");
    this.getAllComidas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllComidas();
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
      console.log(data);
      console.log("Entra");
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

  reloadTable(): void {
    this.dataSource.data = this.selectedComidas;
    this.dataSource.connect();
  }

  onSubmit(f: NgForm) {
    var dietaComidasDTO = new DietaComidaDTO();
    dietaComidasDTO.Dieta = this.setDietaAtributes(f);
    dietaComidasDTO.DietaComidas = this.setDietaComidasList(f);
    
    this.dietaService.save(dietaComidasDTO).subscribe(data => {
      this.dialogRef.close(data);
    },
    error => this.toastr.errorToastr(error, 'Error')
    );
  }

  setDietaAtributes(f: NgForm): Dieta {
    var dieta = new Dieta();
    dieta.Nombre = f.value.Nombre;
    dieta.Descripcion = f.value.Descripcion;
    let empleado = new Empleado();
    empleado.EmpleadoId = this.authenticationService.getCurrentUserId();
    let empleadosList: Empleado[] = [];
    empleadosList.push(empleado);
    dieta.Empleados = empleadosList;
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
    comida.Calorias = f.value.cboxComidas.Calorias;
    var comidaHelper = new ComidaHelper();
    comidaHelper.Comida = comida;
    comidaHelper.DiasSemana = f.value.DiasSemana;
    this.addComida(comidaHelper);
  }

}
