export class Ejercicio {
    Id: number; 
    Descripcion: String; 
 
    constructor(){} 
 
    getDescripcion(): String { 
        return this.Descripcion; 
    } 
 
    setDescripcion(descripcion: String): void { 
        this.Descripcion = descripcion; 
    } 
 
    getId(): number { 
        return this.Id; 
    } 
 
    setId(id: number): void { 
        this.Id = id; 
    } 
}