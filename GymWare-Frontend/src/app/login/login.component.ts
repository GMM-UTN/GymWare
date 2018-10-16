import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrlEmpleado: string;
  returnUrlCliente: string;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    localStorage.removeItem("tipo");

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.returnUrlEmpleado = this.route.snapshot.queryParams['returnUrl'] || '/default/home';
    this.returnUrlCliente = this.route.snapshot.queryParams['returnUrl'] || '/default/cliente';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
      data => {
        if(data.EmpleadoId != undefined && data.EmpleadoId != null){
          this.router.navigate([this.returnUrlEmpleado]);
          localStorage.setItem("tipo","1");
        }
        else if (data.ClienteId != undefined && data.ClienteId != null){
          this.router.navigate([this.returnUrlCliente]);
          localStorage.setItem("tipo","2");
        }
        else {
          alert('Datos ingresados incorrectos !');
        }
        this.loading = false;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}