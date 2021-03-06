import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Rutina } from '../classes/rutina';
import { Cliente } from '../classes/Cliente';
import { EmpleadoClienteRutina } from '../classes/EmpleadoClienteRutina';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RutinaService } from '../services/rutina.service';
import { AuthenticationService } from '../services';
import { Empleado } from 'src/app/classes/Empleado';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rutina-cliente',
  templateUrl: './rutina-cliente.component.html',
  styleUrls: ['./rutina-cliente.component.css'],
  providers: [DatePipe]
})
export class RutinaClienteComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  selectedRutina: Rutina;
  selectedCliente: Cliente;
  editedObject: EmpleadoClienteRutina;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private router: Router,
    private rutinaService: RutinaService,
    private authService: AuthenticationService,
    private toastr: ToastrManager,
    private datepipe: DatePipe) {
      this.editedObject = new EmpleadoClienteRutina();
    }

  ngOnInit() {
  }

  onSelectRutina(rutina: Rutina) {
    this.selectedRutina = rutina;
    this.stepper.next();
  }

  onSelectCliente(cliente: Cliente) {
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
    this.editedObject.Rutina = this.selectedRutina;
    this.editedObject.Cliente = this.selectedCliente;
    var empleado = new Empleado();
    var varSesion = JSON.parse(localStorage.currentUser);
    empleado.EmpleadoId = varSesion.Empleado.EmpleadoId;
    this.editedObject.Empleado = empleado;
    console.log(this.editedObject.Empleado.EmpleadoId);
    this.rutinaService.saveRutinaCliente(this.editedObject as EmpleadoClienteRutina).subscribe( 
      data => { 
        this.editedObject = data
        this.router.navigate(['/default/rutinas']);
        this.toastr.successToastr('Rutina para cliente definida', 'Exito')
      }, 
      error => this.toastr.errorToastr(error, 'Error')
    ); 
  }

  validate(fechaInicio: Date, fechaFin: Date): Boolean{
    return fechaInicio < fechaFin;
  }

}
