import { Injectable } from '@angular/core';
import { CRUDHttpService, baseURL, httpOptions } from '../interfaces/CRUDHttpService';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Rutina } from '../classes/rutina';
import { RutinaEjercicio } from '../classes/rutinaEjercicio';
import { RutinaEjerciciosDTO } from '../classes/rutinaEjerciciosDTO';

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

  update(object: Object): void {
    throw new Error("Method not implemented.");
  }

  public delete(idRutina: number): Observable<any> {
    var id = idRutina;
    const path = `${url}/DeleteRutinaConEjercicios/${id}`;
    console.log(id);
    console.log(path);

    return this.http.delete<any>(path, httpOptions).pipe(
      catchError(this.handleError('deleteRutina'))
    );
  }

  get(object: Object): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getAll(): Observable<RutinaEjerciciosDTO[]> {
    console.log(`${url}/GetAllRutinasConEjercicios`);

    return this.http.get<RutinaEjerciciosDTO[]>(`${url}/GetAllRutinasConEjercicios`, httpOptions).pipe(
      catchError(this.handleError('getRutinas'))
    );
  }

}
