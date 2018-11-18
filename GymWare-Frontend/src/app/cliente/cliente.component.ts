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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator2: MatPaginator;

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
    console.log(this.dataSource)
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
      events: [{
        title: 'Asistencia',
        start: '2018-10-22',
        end: '2018-10-22'
      },
      {
        title: 'Asistencia',
        start: '2018-10-24',
        end: '2018-10-24'
      },
      {
        title: 'Asistencia',
        start: '2018-10-26',
        end: '2018-10-26'
      },
      {
        title: 'Asistencia',
        start: '2018-10-29',
        end: '2018-10-29'
      },
      {
        title: 'Asistencia',
        start: '2018-10-19',
        end: '2018-10-19'
      },
      {
        title: 'Asistencia',
        start: '2018-10-17',
        end: '2018-10-17'
      },
      {
        title: 'Asistencia',
        start: '2018-10-16',
        end: '2018-10-16'
      }]
    };
  }

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource2.paginator = this.paginator2;
  this.dataSource.paginator._intl.itemsPerPageLabel = "Items por página";
}

}
