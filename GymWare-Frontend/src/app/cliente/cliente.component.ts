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
  
  displayedColumns2: string[] = ['Descripcion'];
  
  displayedColumns: string[] = ['Nombre','Descripcion', 'Calorias'];
  dataSource2: MatTableDataSource<EjercicioRutinaDTO>;
  dataSource: MatTableDataSource<ComidaDietaDTO>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator2: MatPaginator;

  datos = JSON.parse(localStorage.currentUser);
  cliente = this.datos.Cliente;
  dieta = this.datos.DietasComidas;
  rutina = this.datos.RutinasEjercicios;
  barChartLabels: string[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  barChartData: number[] = [1, 0, 1, 0, 1];
  barChartType: string = 'bar';
  barChartOptions: any = {
    'legend': {
      display: false,
    },
    'backgroundColor': [
      "#36A2EB",
      "#4BC0C0",
      "#FFCE56",
      "#E7E9ED",
      "#36A2EB"
    ]
  }
  barChartLegend:string = "asistencia"
  constructor() { 
    this.dataSource = new MatTableDataSource([]);
    this.dataSource2 = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.dataSource.data = this.dieta;
    this.dataSource2.data = this.rutina;
    console.log(this.dataSource)
    this.cliente.FechaNacimiento = formatDate(this.cliente.FechaNacimiento, "fullDate", "en-US");
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
