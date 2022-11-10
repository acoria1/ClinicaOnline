import { User } from "./user";

export class Paciente extends User{

    public obraSocial : string;
    
    constructor(email : string, nombre: string,apellido: string,edad: number, dni : string, obraSocial : string,  imagenes : string[], ){
        super(email,nombre,apellido,edad, dni, imagenes,false);
        this.obraSocial = obraSocial;
    }
}
