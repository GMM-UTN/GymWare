import { Injectable } from '@angular/core';
import { CRUDHttpService, baseURL, httpOptions  } from '../interfaces/CRUDHttpService';
import { Observable } from 'rxjs';
import { MembresiaCuotaDTO } from '../classes/index';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const url = baseURL + 'membresias';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService extends CRUDHttpService{

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
  getAll(): Observable<MembresiaCuotaDTO[]> {
    throw new Error("Method not implemented.");
  }
  CreateRenovateMembresia(membresiaCuotaDTO: MembresiaCuotaDTO): Observable<any>{
    return this.http.post<MembresiaCuotaDTO>(`${url}/CreateRenovateMembresia`,membresiaCuotaDTO,httpOptions).pipe(
      catchError(this.handleError('createRenovateMembresia'))
    )
  }
}
