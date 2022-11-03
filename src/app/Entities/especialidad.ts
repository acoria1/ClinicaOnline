
export class Especialidad{

    public id : string | undefined;
    public descripcion : string;

    constructor(  descripcion : string, id?:string){
        this.descripcion = descripcion;
        this.id = id;
    }
}