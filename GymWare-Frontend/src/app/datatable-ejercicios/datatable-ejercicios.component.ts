import { Component, OnInit } from '@angular/core';
import { ELEMENT_DATA } from '../mock-data/data';

@Component({
  selector: 'app-datatable-ejercicios',
  templateUrl: './datatable-ejercicios.component.html',
  styleUrls: ['./datatable-ejercicios.component.css']
})
export class DatatableEjerciciosComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
