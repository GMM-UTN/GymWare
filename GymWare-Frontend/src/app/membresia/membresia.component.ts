import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, Plan, Cuota, MembresiaCuotaDTO } from '../classes/index';
import { MembresiaService, AlertService, ClienteService } from '../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {
  membresiaForm: FormGroup;
  loading = false;
  submitted = false;
  cuota: Cuota;
  clienteID: number;
  clientes: Cliente[];
  membresiaCuotaDTO: MembresiaCuotaDTO;
  planes: Plan[] = [
    {value: 500, viewValue: 'Básico'},
    {value: 700, viewValue: 'Avanzado'},
    {value: 1000, viewValue: 'Premium'}
  ];

  constructor(
    private membresiaService: MembresiaService,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private alertService: AlertService,
    private router: Router,
    public toastr: ToastrManager
  ) { }

  get f() { return this.membresiaForm.controls; }

  ngOnInit() {
    this.cuota = {
      CantidadMeses: null,
      FechaPago: null,
      ImportePago: null
    }
    this.membresiaForm = this.formBuilder.group({
      cantidadMeses: ['', Validators.required],
      fechaPago: ['', Validators.required],
      importePago: [''],
      plan: ['', Validators.required],
      cliente: ['', Validators.required]
    });
    this.getAllClientes();
  }

  onSubmit() {
    this.submitted = true;
    if(this.membresiaForm.invalid){
      return; 
    }
    this.loading = true;
    this.cuota.CantidadMeses = this.f.cantidadMeses.value;
    this.cuota.FechaPago = formatDate(this.f.fechaPago.value, "MM-dd-yyyy", "en_US");
    this.cuota.ImportePago = this.f.cantidadMeses.value * this.f.plan.value;
    this.membresiaCuotaDTO = {
      ClienteId: this.f.cliente.value,
      Cuota: this.cuota
    }
    this.membresiaService.CreateRenovateMembresia(this.membresiaCuotaDTO).pipe(first())
    .subscribe(
    data => {
      if(data.MembresiaId != undefined && data.MembresiaId != null) {
        this.toastr.successToastr('Membresía creada correctamente', 'Éxito');
        this.loading = false;
        this.router.navigate(['/default/asistencia-cliente']);
      } 
      else {
        this.toastr.errorToastr(data, 'Error');
        this.loading = false;
      }
    },
    error => {
      this.toastr.errorToastr(error, 'Error');
      this.loading = false;
    });
    this.membresiaForm.reset();
  }

  getAllClientes():void {
    this.clienteService.getAll().subscribe(data => {
      this.clientes = data;
    });
  }
}
