import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Cliente } from '../classes/Cliente';
import { Dieta } from 'src/app/classes/Dieta';
import { DietaCliente } from '../classes/DietaCliente';
import { MatStepper } from '@angular/material';
import { DietaService } from '../services/dieta.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dieta-cliente',
  templateUrl: './dieta-cliente.component.html',
  styleUrls: ['./dieta-cliente.component.css'],
  providers: [DatePipe]
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
    private dietaService: DietaService,
    public toastr: ToastrManager,
    private datepipe: DatePipe) {
      this.editedObject = new DietaCliente();
    }

  ngOnInit() {
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

  onSubmitFormFechas(form: NgForm) {
    if(this.validate(form.value.fechaInicio,form.value.fechaFin)){
      this.editedObject.FechaInicio = this.datepipe.transform(form.value.fechaInicio, 'yyyy-MM-dd');
      this.editedObject.FechaFin = this.datepipe.transform(form.value.fechaFin, 'yyyy-MM-dd');
      this.save();
    } else {
      this.toastr.errorToastr('La fecha de inicio es mayor a la fecha de fin', 'Error');
    }  
  }

  save() {
    this.editedObject.Dieta = this.selectedDieta;
    this.editedObject.Cliente = this.selectedCliente;
    this.dietaService.saveDietaCliente(this.editedObject as DietaCliente).subscribe( 
      data => { 
        this.editedObject = data
        this.router.navigate(['/default/dietas']);
        this.toastr.successToastr('Dieta para cliente definida', 'Exito')
      }, 
      error => this.toastr.errorToastr(error, 'Error')
    ); 
  }

  validate(fechaInicio: Date, fechaFin: Date): Boolean{
    return fechaInicio < fechaFin;
  }
}
