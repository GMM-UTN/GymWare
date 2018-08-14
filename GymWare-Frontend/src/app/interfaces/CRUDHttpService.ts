import { Observable, of } from "../../../node_modules/rxjs"; 
import { HttpHeaders } from "@angular/common/http"; 

export abstract class CRUDHttpService {

    abstract save(object: Object): void;

    abstract update(object: Object): void;

    abstract delete(object: Object): void;

    abstract get(object: Object): Observable<any>;

    abstract getAll(): Observable<any[]>;

    abstract getAll(): Observable<any[]>; 
 
    /** 
     * Handle Http operation that failed. 
     * Let the app continue. 
     * @param operation - name of the operation that failed 
     * @param result - optional value to return as the observable result 
     */ 
    public handleError (operation = 'operation', result?: any) { 
        return (error: any): Observable<any> => { 
        console.error(error); // log to console instead 
        return of(result as any); 
        }; 
    } 
}

export const baseURL: String = "http://localhost:59538/api/";

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };