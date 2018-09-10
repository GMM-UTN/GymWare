import { Injectable } from '@angular/core';
import { CRUDHttpService, baseURL, httpOptions } from '../interfaces/CRUDHttpService';
import { HttpClient } from '@angular/common/http';
import { DietaComidaDTO } from '../classes/DietaComidaDTO';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const url = baseURL + 'dietas';

@Injectable({
  providedIn: 'root'
})
export class DietaService extends CRUDHttpService{

  constructor(private http: HttpClient) {
    super();
  }

  save(dietaComidaDTO: DietaComidaDTO): Observable<DietaComidaDTO> {
    return this.http.post<DietaComidaDTO>(`${url}/PostDietaConComidas`, dietaComidaDTO, httpOptions).pipe(
      catchError(this.handleError('postDietas')));
  }

  update(dietaComidaDTO: DietaComidaDTO): Observable<DietaComidaDTO> {
    var id = dietaComidaDTO.Dieta.DietaId;
    debugger;
    return this.http.put<DietaComidaDTO>(`${url}/PutDietaConEjercicios/${id}`, dietaComidaDTO, httpOptions).pipe(
      catchError(this.handleError('UpdateDietaComidas'))
    );
  }

  public delete(idComida: number): Observable<any> {
    var id = idComida;
    const path = `${url}/DeleteDietaConComidas/${id}`;

    return this.http.delete<any>(path, httpOptions).pipe(
      catchError(this.handleError('deleteDieta'))
    );
  }

  get(object: Object): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getAll(): Observable<DietaComidaDTO[]> {
    return this.http.get<DietaComidaDTO[]>(`${url}/GetAllDietasConComidas`, httpOptions).pipe(
      catchError(this.handleError('getDietas'))
    );
  }

}
