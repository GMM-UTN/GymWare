import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services';
import { DietaService } from '../services/dieta.service';
import { RutinaService } from '../services/rutina.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {

  cantidadClientes: number;
  cantidadRutinas: number;
  cantidadDietas: number;
  cantidadAsistencias: number;

  constructor(
    private _clienteService: ClienteService,
    private _dietaService: DietaService,
    private _rutinaService: RutinaService
  ) { }

  ngOnInit() {
    this.getAllClientes();
    this.getAllRutinas();
    this.getAllDietas();
    this.getAllAsistencias();
  }

  getAllClientes() {
    this._clienteService.getAll().subscribe( 
      data => { 
        this.cantidadClientes = data.length;
        console.log(data.length);
      }, 
      error => console.log(error)
    );
  }

  getAllRutinas() {
    this._rutinaService.getAll().subscribe( 
      data => { 
        this.cantidadRutinas = data.length;
        console.log(data.length);
      }, 
      error => console.log(error)
    );
  }

  getAllDietas() {
    this._dietaService.getAll().subscribe( 
      data => { 
        this.cantidadDietas = data.length;
        console.log(data.length);
      }, 
      error => console.log(error)
    );
  }

  getAllAsistencias() {
    this._clienteService.getTodayAsistencias().subscribe( 
      data => { 
        this.cantidadAsistencias = data.length;
        console.log(data.length);
      }, 
      error => console.log(error)
    );
  }

}
