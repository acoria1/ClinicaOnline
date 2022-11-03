import { User } from "./user";

export class Paciente extends User{

    public obraSocial : string | undefined;
    
    constructor(email : string, nombre: string,apellido: string,edad: number, imagenes : string[], obraSocial? : string){
        super(email,nombre,apellido,edad, imagenes,false);
        this.obraSocial = obraSocial;
    }
}
