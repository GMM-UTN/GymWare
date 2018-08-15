import { Component, OnInit, ViewChild } from '@angular/core';
import { Ejercicio } from '../classes/ejercicio';
import { EjercicioService } from '../services/ejercicio.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

  const initialSelection = [];
  const allowMultiSelect = true;

@Component({
  selector: 'app-abm-ejercicio',
  templateUrl: './abm-ejercicio.component.html',
  styleUrls: ['./abm-ejercicio.component.css']
})
export class AbmEjercicioComponent implements OnInit {

  selection = new SelectionModel<Ejercicio>(allowMultiSelect, initialSelection);
  displayedColumns: string[] = ['select','EjercicioId','Descripcion', 'actions'];
  dataSource: MatTableDataSource<Ejercicio>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ejercicioService: EjercicioService) { 
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }
  
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getAll(): void {
    this.ejercicioService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, 
    error => alert(error)
    ); 
  }
}
