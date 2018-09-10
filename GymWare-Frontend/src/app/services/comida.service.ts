import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'node_modules/rxjs';
import { Comida } from '../classes/comida';
import { CRUDHttpService, baseURL, httpOptions } from '../interfaces/CRUDHttpService';
import { map, filter, scan } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';

const url = baseURL + 'comidas';

@Injectable({
  providedIn: 'root'
})
export class ComidaService extends CRUDHttpService {
 
  constructor(private http: HttpClient) {
    super();
  }

  public save(comida: Comida): Observable<Comida> {
    return this.http.post<Comida>(`${url}/PostComida`, comida, httpOptions).pipe(
      catchError(this.handleError('addProvider'))
    );
  }

  public update(comida: Comida): Observable<Comida> {
    var id = comida.ComidaId;
    return this.http.put<Comida>(`${url}/PutComida/${id}`, comida, httpOptions).pipe(
      catchError(this.handleError('UpdateEjercicio'))
    );
  }

  public get(object: Object): Observable<any> {
    throw new Error("Method not implemented.");
  }

  public delete(comida: Comida | number): Observable<any> {
    const id = typeof comida === 'number' ? comida : comida.ComidaId;
    const path = `${url}/DeleteComida/${id}`;

    return this.http.delete<any>(path, httpOptions).pipe(
      catchError(this.handleError('deleteCustomer'))
    );
  }

  public getAll(): Observable<Comida[]> {
    return this.http.get<Comida[]>(`${url}/GetComidas`).pipe(
      catchError(this.handleError('addProvider'))
    );
  }
}
