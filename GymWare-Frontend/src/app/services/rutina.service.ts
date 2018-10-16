import { Injectable } from '@angular/core';
import { CRUDHttpService, baseURL, httpOptions } from '../interfaces/CRUDHttpService';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Rutina } from '../classes/rutina';
import { RutinaEjercicio } from '../classes/rutinaEjercicio';
import { RutinaEjerciciosDTO } from '../classes/rutinaEjerciciosDTO';
import { EmpleadoClienteRutina } from '../classes/EmpleadoClienteRutina';

const url = baseURL + 'rutinas';

@Injectable({
  providedIn: 'root'
})
export class RutinaService extends CRUDHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  save(rutinaEjerciciosDTO: RutinaEjerciciosDTO): Observable<RutinaEjerciciosDTO> {
    return this.http.post<RutinaEjerciciosDTO>(`${url}/PostRutinaConEjercicios`, rutinaEjerciciosDTO, httpOptions).pipe(
      catchError(this.handleError('postRutinas')));
  }

  public saveRutinaCliente(rutinaCliente: EmpleadoClienteRutina): Observable<EmpleadoClienteRutina> {
    return this.http.post<EmpleadoClienteRutina>(`${url}/PostEmpleadoClienteRutina`, rutinaCliente, httpOptions).pipe(
      catchError(this.handleError("PostEmpleadoClienteRutina")));
  }

  update(rutinaEjerciciosDTO: RutinaEjerciciosDTO): Observable<RutinaEjerciciosDTO> {
    var id = rutinaEjerciciosDTO.Rutina.RutinaId;
    debugger;
    return this.http.put<RutinaEjerciciosDTO>(`${url}/PutRutinaConEjercicios/${id}`, rutinaEjerciciosDTO, httpOptions).pipe(
      catchError(this.handleError('UpdateRutinaEjercicios'))
    );
  }

  public delete(idRutina: number): Observable<any> {
    var id = idRutina;
    const path = `${url}/DeleteRutinaConEjercicios/${id}`;

    return this.http.delete<any>(path, httpOptions).pipe(
      catchError(this.handleError('deleteRutina'))
    );
  }

  get(object: Object): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getAll(): Observable<RutinaEjerciciosDTO[]> {
    return this.http.get<RutinaEjerciciosDTO[]>(`${url}/GetAllRutinasConEjercicios`, httpOptions).pipe(
      catchError(this.handleError('getRutinas'))
    );
  }

}
