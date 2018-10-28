import { Dieta } from "src/app/classes/Dieta";
import { Cliente } from "src/app/classes/Cliente";

export class DietaCliente {

    DietaClienteId: number;
    Dieta: Dieta;
    Cliente: Cliente;
    FechaInicio: String;
    FechaFin: String;
}