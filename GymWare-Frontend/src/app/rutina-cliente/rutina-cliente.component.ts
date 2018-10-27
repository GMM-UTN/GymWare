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

@Component({
  selector: 'app-rutina-cliente',
  templateUrl: './rutina-cliente.component.html',
  styleUrls: ['./rutina-cliente.component.css']
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
    private formBuilder: FormBuilder,
    private rutinaService: RutinaService,
    private authService: AuthenticationService,
    private toastr: ToastrManager) {
      this.editedObject = new EmpleadoClienteRutina();
    }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onSelectRutina(rutina: Rutina) {
    console.log(rutina);
    this.selectedRutina = rutina;
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
    this.editedObject.Rutina = this.selectedRutina;
    this.editedObject.Cliente = this.selectedCliente;
    console.log(this.editedObject);
    var empleado = new Empleado();
    empleado.EmpleadoId = 9;
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

}
