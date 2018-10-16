import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  cliente = JSON.parse(localStorage.currentUser);
  barChartLabels: string[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  barChartData: number[] = [1, 0, 0, 1, 1];
  barChartType: string = 'bar';
  barChartOptions: any = {
    'legend': {
      display: false,
    },
    'backgroundColor': [
      "#E7E9ED",
      "#4BC0C0",
      "#FFCE56",
      "#E7E9ED",
      "#36A2EB"
    ]
  }
  barChartLegend:string = "asistencia"
  constructor() { }

  ngOnInit() {
}

}
