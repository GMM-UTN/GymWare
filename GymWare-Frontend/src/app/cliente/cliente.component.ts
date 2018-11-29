import { Component, OnInit, ViewChild } from '@angular/core';
import { ComidaDietaDTO } from '../classes/ComidaDietaDTO';
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { EjercicioRutinaDTO } from '../classes/ejercicioRutinasDTO';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { Chart } from 'chart.js';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  
  displayedColumns2: string[] = ['Descripcion', 'Series', 'Repeticiones'];
  
  displayedColumns: string[] = ['Nombre','Descripcion', 'Calorias'];
  dataSource2: MatTableDataSource<EjercicioRutinaDTO>;
  dataSource: MatTableDataSource<ComidaDietaDTO>;
  @ViewChild('paginatorDieta') paginator: MatPaginator;
  @ViewChild('paginatorRutina') paginator2: MatPaginator;

  datos = JSON.parse(localStorage.currentUser);
  cliente = this.datos.Cliente;
  dieta = this.datos.DietasComidas;
  rutina = this.datos.RutinasEjercicios;
  constructor() { 
    this.dataSource = new MatTableDataSource([]);
    this.dataSource2 = new MatTableDataSource([]);
  }

  ngOnInit() {
    if(this.dieta != undefined && this.dieta != null)
    {
      this.dataSource.data = this.dieta;
    }
    if(this.rutina != undefined && this.rutina != null)
    {
      this.dataSource2.data = this.rutina;
    }
    console.log(this.cliente)
    this.cliente.FechaNacimiento = formatDate(this.cliente.FechaNacimiento, "MM-dd-yyyy", "en-US");
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      height: 550,
      locale: 'es',
      header: {
        left: 'prev,next',
        center: '',
        right: 'title'
      },
      events: this.datos.Asistencias
    };
  }

ngAfterViewInit() {
  setTimeout(() => this.dataSource.paginator = this.paginator);
  setTimeout(() => this.dataSource2.paginator = this.paginator2);
  // this.dataSource.paginator._intl.itemsPerPageLabel = "Items por página";
  // this.dataSource2.paginator._intl.itemsPerPageLabel = "Items por página";
}

}
