import { Injectable } from '@angular/core';
import { CRUDHttpService, baseURL } from '../interfaces/CRUDHttpService';
import { Observable } from 'rxjs';
import { Cliente } from '../classes/Cliente';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const url = baseURL + 'usuarios';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CRUDHttpService{
  
  constructor(private http: HttpClient) {
    super();
   }

  save(object: Object): void {
    throw new Error("Method not implemented.");
  }
  update(object: Object): void {
    throw new Error("Method not implemented.");
  }
  delete(object: Object): void {
    throw new Error("Method not implemented.");
  }
  get(object: Object): Observable<any> {
    throw new Error("Method not implemented.");
  }
  
  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${url}/GetClientes`).pipe(
      catchError(this.handleError('GetClientes'))
    );
  }

  
}
