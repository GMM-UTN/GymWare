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
import { AltaEjercicioComponent } from './alta-ejercicio/alta-ejercicio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormularioAltaRutinaComponent,
    DatatableEjerciciosComponent,
    AltaEjercicioComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
