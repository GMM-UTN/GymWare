import { Usuario } from "./Usuario";
import { Dieta } from "src/app/classes/Dieta";

export class Empleado extends Usuario{
    EmpleadoId: number;
    Rol: String;
    Dietas: Dieta[];
}