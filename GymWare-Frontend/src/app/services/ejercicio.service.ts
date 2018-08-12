import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Ejercicio } from '../classes/ejercicio';
import { CRUDHttpService, baseURL, httpOptions } from '../interfaces/CRUDHttpService';

const url = baseURL + 'ejercicios';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService implements CRUDHttpService {

  constructor(private http: HttpClient) { }

  public save(ejercicio: Ejercicio): void {
    this.http.post<Ejercicio>(url, ejercicio, httpOptions);
  }

  public update(object: Object): void {
    throw new Error("Method not implemented.");
  }

  public get(object: Object): Observable<any> {
    throw new Error("Method not implemented.");
  }
  
  public delete(ejercicio: Ejercicio): void {
    throw new Error("Method not implemented.");
  }

  public getAll(): Observable<Ejercicio[]>{
    return this.http.get<any>(url);
  }
}
