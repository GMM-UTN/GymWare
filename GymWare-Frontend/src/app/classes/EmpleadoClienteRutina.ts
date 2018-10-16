import { Cliente } from "./Cliente";
import { Empleado } from "./Empleado";
import { Rutina } from "./rutina";

export class EmpleadoClienteRutina {

    EmpleadoClienteRutinaId: number;
    Cliente: Cliente;
    Empleado: Empleado;
    Rutina: Rutina;
    FechaInicio: Date;
    FechaFin: Date;
}