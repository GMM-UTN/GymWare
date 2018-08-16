import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'node_modules/rxjs';
import { Ejercicio } from '../classes/ejercicio';
import { CRUDHttpService, baseURL, httpOptions } from '../interfaces/CRUDHttpService';
import { map, filter, scan } from 'rxjs/operators'; 
import { catchError, tap } from 'rxjs/operators'; 

const url = baseURL + 'ejercicios';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService extends CRUDHttpService {

  constructor(private http: HttpClient) { 
    super();
  }

  public save(ejercicio: Ejercicio): Observable<Ejercicio> { 
    console.log(ejercicio); 
    console.log("entra"); 
    console.log(url); 
    return this.http.post<Ejercicio>(url, ejercicio, httpOptions).pipe( 
      catchError(this.handleError('addProvider')) 
    ); 
  }

  public update(object: Object): void {
    throw new Error("Method not implemented.");
  }

  public get(object: Object): Observable<any> {
    throw new Error("Method not implemented.");
  }
  
  public delete(ejercicio: Ejercicio | number): Observable<any> {
    const id = typeof ejercicio === 'number' ? ejercicio : ejercicio.getId;
    const path = `${url}/${id}`;
    console.log(id);
    console.log(path);

    return this.http.delete<any>(path, httpOptions).pipe(
      catchError(this.handleError('deleteCustomer'))
    );
  }

  public getAll(): Observable<Ejercicio[]>{
    return this.http.get<Ejercicio[]>(url).pipe( 
      catchError(this.handleError('addProvider')) 
    );
  }
}
