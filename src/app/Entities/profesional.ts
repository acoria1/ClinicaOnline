import { Especialidad } from "./especialidad";
import { User } from "./user";

export class Profesional extends User{

    public especialidades : Especialidad[];
    
    constructor(email : string, nombre: string,apellido: string,edad: number, dni : string, imagenes : string[], especialidades : Especialidad[]){
        super(email,nombre,apellido,edad,dni, imagenes,false);
        this.especialidades = especialidades;
    }
}
