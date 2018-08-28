import { Rutina } from "src/app/classes/rutina";
import { RutinaEjercicio } from "./rutinaEjercicio";

export class RutinaEjerciciosDTO {

    Rutina: Rutina;
    RutinaEjercicios: RutinaEjercicio[] = [];

    constructor() {}
}