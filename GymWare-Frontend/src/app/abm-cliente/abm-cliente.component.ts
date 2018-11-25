import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatStepper } from '@angular/material';
import { Cliente } from 'src/app/classes/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-abm-cliente',
  templateUrl: './abm-cliente.component.html',
  styleUrls: ['./abm-cliente.component.css']
})
export class AbmClienteComponent implements OnInit {
  
  @Input() check: boolean;
  @Output() cliente = new EventEmitter<Cliente>();

  displayedColumns: string[] = ['Nombre', 'Apellido', 'Dni', 'add', 'select'];
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuarioService: ClienteService,
    public toastr: ToastrManager,
    private router: Router,) {
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
    }, 
    error => this.toastr.errorToastr(error, 'Error')
    ); 
  }

  selectCliente(cliente: Cliente) {
    this.cliente.emit(cliente);
  }

  add(): void{
    this.router.navigate(['/default/alta-cliente']);
  }

  print() {
    var columns = [
      {title: "Nombre", dataKey: "nombre"},
      {title: "Apellido", dataKey: "apellido"},
      {title: "Dni", dataKey: "dni"},
      {title: "Mail", dataKey: "mail"},
      {title: "Telefono", dataKey: "telefono"}
    ];
    var rows = [];

    for (let i = 0; i < this.dataSource.data.length; i++) {
      var obj = {
        "nombre": this.dataSource.data[i].Nombre,
        "apellido": this.dataSource.data[i].Apellido,
        "dni": this.dataSource.data[i].Dni,
        "mail": this.dataSource.data[i].Mail,
        "telefono": this.dataSource.data[i].Telefono,
      }

      rows.push(obj);
    }

    // Only pt supported (not mm or in)
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.save('Clientes.pdf');
  }
}
