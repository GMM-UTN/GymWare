import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CRUDHttpService, baseURL, httpOptions } from '../interfaces/CRUDHttpService';
import { Usuario } from '../classes/Usuario';
import { Empleado } from '../classes/Empleado';

const url = baseURL + 'usuarios';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        console.log(username);
        return this.http.post<any>(`${url}/CheckUsuario`, { Usuario: username, Contrasenia: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    if(user.ClienteId != undefined){
                        console.log("cliente");
                    }
                    else if(user.EmpleadoId != undefined) {
                        console.log("empleado");
                    }
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getCurrentUserId(): number{
        var storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if(storedUser.EmpleadoId != null) {
            return storedUser.EmpleadoId as number;
        } else {
            return storedUser.ClienteId as number;
        }
    }
}