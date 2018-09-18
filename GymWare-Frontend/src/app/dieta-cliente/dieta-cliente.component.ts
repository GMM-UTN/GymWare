import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../classes/Cliente';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-dieta-cliente',
  templateUrl: './dieta-cliente.component.html',
  styleUrls: ['./dieta-cliente.component.css']
})
export class DietaClienteComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  displayedColumns: string[] = ['NombreUsuario', 'Nombre', 'Apellido', 'Dni', 'actions'];
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private usuarioService: ClienteService) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.getAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAll(): void{
    this.usuarioService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, 
    error => alert(error)
    ); 
  }


}
