export interface UserAuthData {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    metadata : { 
        creationTime : string, 
        lastSignInTime : string 
    }
}

export class User{

    public uid? : string;
    public email : string;
    public nombre: string;
    public apellido: string;
    public edad: number;
    public isAdmin : boolean;
    public imagenes : string[];

    constructor(email : string, nombre: string,apellido: string,edad: number, imagenes : string[], isAdmin : boolean = false, uid? : string){
        this.uid = uid;
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.imagenes = imagenes;
        this.isAdmin = isAdmin;
    }
}