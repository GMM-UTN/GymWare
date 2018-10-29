import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../classes/index';
import { ClienteService, AlertService } from '../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.css']
})
export class AltaClienteComponent implements OnInit {
  clienteForm: FormGroup;
  loading = false;
  submitted = false;
  cliente: Cliente;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private alertService: AlertService,
    private router: Router,
    public toastr: ToastrManager) { }


  get f() { return this.clienteForm.controls; }

  ngOnInit() {
    this.cliente = {
      Dni: null,
      Nombre: null,
      Apellido: null,
      NombreUsuario: null,
      Contrasenia: null,
      Mail: null,
      Direccion: null,
      Telefono: null,
      FechaNacimiento: null,
      PesoActual: null,
      PesoInicial: null,
      AlturaActual: null,
      AlturaInicial: null
    }
    this.clienteForm = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Dni: [''],
      NombreUsuario: ['', Validators.required],
      Contrasenia: ['', Validators.required],
      Mail: ['', Validators.required],
      Telefono: ['', Validators.required],
      Direccion: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      PesoInicial: ['', Validators.required],
      AlturaInicial: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.clienteForm.invalid) {
      return;
    }
    this.loading = true;
    this.cliente.Dni = this.f.Dni.value;
    this.cliente.Nombre = this.f.Nombre.value;
    this.cliente.Apellido = this.f.Apellido.value;
    this.cliente.Direccion = this.f.Direccion.value;
    this.cliente.Telefono = this.f.Telefono.value;
    this.cliente.FechaNacimiento = formatDate(this.f.FechaNacimiento.value, "MM-dd-yyyy", "en_US");
    this.cliente.NombreUsuario = this.f.NombreUsuario.value;
    this.cliente.Contrasenia = this.f.Contrasenia.value;
    this.cliente.Mail = this.f.Mail.value;
    this.cliente.AlturaInicial = this.f.AlturaInicial.value;
    this.cliente.PesoInicial = this.f.PesoInicial.value;
    this.cliente.AlturaActual = this.f.AlturaInicial.value;
    this.cliente.PesoActual = this.f.PesoInicial.value;
    this.clienteService.createCliente(this.cliente).pipe(first())
      .subscribe(
      data => {
        if (data.ClienteId != undefined && data.ClienteId != null) {
          this.toastr.successToastr('Cliente creado correctamente', 'Éxito');
          this.router.navigate(['/default/membresia-cliente']);
        }
        else {
          this.toastr.errorToastr(data, 'Error');
        }
        this.loading = false;
      },
      error => {
        this.toastr.errorToastr(error, 'Error');
        this.alertService.error(error);
        this.loading = false;
      });
    this.clienteForm.reset();
    this.loading = false;
  }

}
