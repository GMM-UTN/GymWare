import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../classes/Cliente';
import { ClienteService, AlertService } from '../services';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-cliente-asistencia',
  templateUrl: './cliente-asistencia.component.html',
  styleUrls: ['./cliente-asistencia.component.css']
})
export class ClienteAsistenciaComponent implements OnInit {
  asistenciaForm: FormGroup;
  loading = false;
  submitted = false;
  mensaje: string;
  cliente: {
    dni: string
  };

  constructor(private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private alertService: AlertService,
    public toastr: ToastrManager) {
    }

  get f() { return this.asistenciaForm.controls; }

  ngOnInit() {
    this.mensaje = '';
    this.cliente = {
      dni: '',
    }
    this.asistenciaForm = this.formBuilder.group({
      dni: ['']
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.asistenciaForm.invalid) {
      return;
    }
    this.cliente.dni = this.f.dni.value;
    this.loading = true;
    this.clienteService.registrarAsistencia(this.cliente).pipe(first())
      .subscribe(
      data => {
        if (data.includes('Bienvenido de nuevo:')) {
          this.toastr.successToastr(data, 'Éxito');
        }
        else {
          this.toastr.errorToastr(data, 'Error');
        }
        this.loading = false;
      },
      error => {
        this.toastr.errorToastr(error, 'Error');
        this.loading = false;
      });
      this.asistenciaForm.reset();
      setInterval(this.mensaje='',5000);
      }
  }
