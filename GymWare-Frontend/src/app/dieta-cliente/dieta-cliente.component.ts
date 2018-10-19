import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Cliente } from '../classes/Cliente';
import { Dieta } from 'src/app/classes/Dieta';
import { DietaCliente } from '../classes/DietaCliente';
import { MatStepper } from '@angular/material';
import { DietaService } from '../services/dieta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dieta-cliente',
  templateUrl: './dieta-cliente.component.html',
  styleUrls: ['./dieta-cliente.component.css']
})
export class DietaClienteComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  selectedDieta: Dieta;
  selectedCliente: Cliente;
  editedObject: DietaCliente;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dietaService: DietaService) {
      this.editedObject = new DietaCliente();
    }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onSelectDieta(dieta: Dieta) {
    console.log(dieta);
    this.selectedDieta = dieta;
    this.stepper.next();
  }

  onSelectCliente(cliente: Cliente) {
    console.log(cliente);
    this.selectedCliente = cliente;
    this.stepper.next();
  }

  submitFormFechas(form: NgForm) {
    this.editedObject.FechaInicio = form.value.fechaInicio;
    this.editedObject.FechaFin = form.value.fechaFin;
    this.stepper.next();
  }

  save() {
    this.editedObject.Dieta = this.selectedDieta;
    this.editedObject.Cliente = this.selectedCliente;
    this.dietaService.saveDietaCliente(this.editedObject as DietaCliente).subscribe( 
      data => { 
        this.editedObject = data
        this.router.navigate(['/default/dietas']);
      }, 
      error => alert(error) 
    ); 
  }

}
