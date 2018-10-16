import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  title = 'Chart';
  pieChartLabels:string[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  pieChartData:number[] = [1, 2];
  pieChartType:string = 'pie';
  pieChartOptions:any = {'backgroundColor': [
               "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
            ]}
  constructor() { }

  ngOnInit() {
    
  }

}
