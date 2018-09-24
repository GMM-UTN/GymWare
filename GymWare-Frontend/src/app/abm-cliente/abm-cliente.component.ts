import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatStepper } from '@angular/material';
import { Cliente } from 'src/app/classes/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-abm-cliente',
  templateUrl: './abm-cliente.component.html',
  styleUrls: ['./abm-cliente.component.css']
})
export class AbmClienteComponent implements OnInit {
  
  @Output() cliente = new EventEmitter<Cliente>();

  displayedColumns: string[] = ['Nombre', 'Apellido', 'Dni', 'actions'];
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuarioService: ClienteService) {
    this.dataSource = new MatTableDataSource([]);
   }

  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAll(): void{
    this.usuarioService.getAll().subscribe(data => {
      this.dataSource.data = data;
      console.log(data);
    }, 
    error => alert(error)
    ); 
  }

  selectCliente(cliente: Cliente) {
    this.cliente.emit(cliente);
  }

}
