
export class User {

    public nombre: string;
    public uid: string;
    public email: string;

    constructor(obj: DataObj) {
        this.nombre = obj.nombre;
        this.uid = obj.uid;
        this.email = obj.email;
    }
}

interface DataObj {
    uid: string;
    email: string;
    nombre: string;
}