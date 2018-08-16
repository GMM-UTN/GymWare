import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormularioAltaRutinaComponent } from './formulario-alta-rutina/formulario-alta-rutina.component';
import { DatatableEjerciciosComponent } from './datatable-ejercicios/datatable-ejercicios.component';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { CenterComponent } from './center/center.component';
import { PrincipalComponent } from './principal/principal.component';
import { AltaEjercicioComponent } from './alta-ejercicio/alta-ejercicio.component';
import { FormsModule } from '@angular/forms'; 
import { EjercicioService } from './services/ejercicio.service';
import { AbmEjercicioComponent } from './abm-ejercicio/abm-ejercicio.component'; 
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material'; 
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogBoxComponent } from './delete-dialog-box/delete-dialog-box.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'default',
    component: CenterComponent
  },
  {
    path: 'ejercicios',
    component: AbmEjercicioComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormularioAltaRutinaComponent,
    DatatableEjerciciosComponent,
    HeaderComponent,
    FooterComponent,
    CenterComponent,
    PrincipalComponent,
    AltaEjercicioComponent,
    AbmEjercicioComponent,
    DeleteDialogBoxComponent
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
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [
    EjercicioService
  ],entryComponents: [
    AltaEjercicioComponent,
    DeleteDialogBoxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
