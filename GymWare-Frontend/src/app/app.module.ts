import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormularioAltaRutinaComponent } from './formulario-alta-rutina/formulario-alta-rutina.component';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { CenterComponent } from './center/center.component';
import { PrincipalComponent } from './principal/principal.component';
import { AltaEjercicioComponent } from './alta-ejercicio/alta-ejercicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EjercicioService } from './services/ejercicio.service';
import { AbmEjercicioComponent } from './abm-ejercicio/abm-ejercicio.component';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogBoxComponent } from './delete-dialog-box/delete-dialog-box.component';
import { EditEjercicioComponent } from './edit-ejercicio/edit-ejercicio.component';
import { AmbRutinaComponent } from './amb-rutina/amb-rutina.component';
import { AltaRutinaComponent } from './alta-rutina/alta-rutina.component';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { DefaultComponent } from './default/default.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { EditRutinaComponent } from './edit-rutina/edit-rutina.component';
import { AbmComidaComponent } from './abm-comida/abm-comida.component';
import { AltaComidaComponent } from './alta-comida/alta-comida.component';
import { EditComidaComponent } from './edit-comida/edit-comida.component';
import { AbmDietaComponent } from './abm-dieta/abm-dieta.component';
import { AltaDietaComponent } from './alta-dieta/alta-dieta.component';
import { EditDietaComponent } from './edit-dieta/edit-dieta.component';
import { DietaClienteComponent } from './dieta-cliente/dieta-cliente.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule, MatNativeDateModule  } from '@angular/material';
import { AbmClienteComponent } from './abm-cliente/abm-cliente.component'


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    component: AppComponent
  },
  {
    path: 'principal',
    component: PresentacionComponent
  },
  {
    path: 'default',
    component: DefaultComponent,
    children: [
      {
        path: 'home',
        component: CenterComponent
      },
      {
        path: 'ejercicios',
        component: AbmEjercicioComponent
      },
      {
        path: 'rutinas',
        component: AmbRutinaComponent
      },
      {
        path: 'comidas',
        component: AbmComidaComponent
      },
      {
        path: 'dietas',
        component: AbmDietaComponent
      },
      {
        path: 'dieta-cliente',
        component: DietaClienteComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormularioAltaRutinaComponent,
    HeaderComponent,
    FooterComponent,
    CenterComponent,
    PrincipalComponent,
    AltaEjercicioComponent,
    AbmEjercicioComponent,
    DeleteDialogBoxComponent,
    EditEjercicioComponent,
    DefaultComponent,
    PresentacionComponent,
    AmbRutinaComponent,
    AltaRutinaComponent,
    EditRutinaComponent,
    AbmComidaComponent,
    AltaComidaComponent,
    EditComidaComponent,
    AbmDietaComponent,
    AltaDietaComponent,
    EditDietaComponent,
    DietaClienteComponent,
    AbmClienteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    HttpClientModule,
    MatMenuModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    EjercicioService,
    AuthenticationService,
    AlertService
  ], entryComponents: [
    AltaEjercicioComponent,
    DeleteDialogBoxComponent,
    EditEjercicioComponent,
    AltaRutinaComponent,
    EditRutinaComponent,
    AltaComidaComponent,
    EditComidaComponent,
    AltaDietaComponent,
    EditDietaComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
