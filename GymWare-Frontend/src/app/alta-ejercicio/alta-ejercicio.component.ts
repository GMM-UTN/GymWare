import { Component, OnInit } from '@angular/core';
import { EjercicioService } from '../services/ejercicio.service';
import { Ejercicio } from '../classes/ejercicio';

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

  public save(): void {
    this.ejercicioService.save(this.ejercicio);
  }

  onSubmit(){
    this.ejercicioService.save(this.ejercicio);
  }
}
