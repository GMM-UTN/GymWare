export class Ejercicio {
    EjercicioId: number; 
    Descripcion: String; 
 
    constructor(){} 
 
    getDescripcion(): String { 
        return this.Descripcion; 
    } 
 
    setDescripcion(descripcion: String): void { 
        this.Descripcion = descripcion; 
    } 
 
    getId(): number { 
        return this.EjercicioId; 
    } 
 
    setId(id: number): void { 
        this.EjercicioId = id; 
    } 
}