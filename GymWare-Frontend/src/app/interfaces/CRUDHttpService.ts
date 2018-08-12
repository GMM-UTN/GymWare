import { Observable } from "../../../node_modules/rxjs";

export interface CRUDHttpService {

    save(object: Object): void;

    update(object: Object): void;

    delete(object: Object): void;

    get(object: Object): Observable<any>;

    getAll(): Observable<any[]>;
}

export const baseURL: String = "http://localhost:59538/api/";