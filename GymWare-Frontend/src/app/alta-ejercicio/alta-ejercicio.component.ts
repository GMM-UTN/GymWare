import { Component, OnInit } from '@angular/core';
import { EjercicioService } from '../services/ejercicio.service';
import { Ejercicio } from '../classes/ejercicio';
import {NgForm} from '@angular/forms'; 

@Component({
  selector: 'app-alta-ejercicio',
  templateUrl: './alta-ejercicio.component.html',
  styleUrls: ['./alta-ejercicio.component.css']
})
export class AltaEjercicioComponent implements OnInit {

  ejercicio: Ejercicio;

  constructor(private ejercicioService: EjercicioService) { }

  ngOnInit() {
    this.ejercicio = new Ejercicio();
  }

  onSubmit(f: NgForm){ 
    var ejercicio = new Ejercicio(); 
    ejercicio.setId(0); 
    ejercicio.setDescripcion(f.value.Descripcion); 
    console.log(ejercicio); 
    this.ejercicioService.save(ejercicio).subscribe( 
      data => { 
         
      }, 
      error => alert(error) 
    ); 
  } 
}
