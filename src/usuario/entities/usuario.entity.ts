import { Alumno } from "src/alumno/entities/alumno.entity";
import { Entrenador } from "src/entrenador/entities/entrenador.entity";
import { Column, Entity,OneToOne,PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    rol:string;

    @Column()
    nombre:string;

    @Column()
    email:string;

    @OneToOne(()=> Alumno)
    alumno:Alumno

    @OneToOne(()=> Entrenador)
    entrenador:Entrenador;

    constructor(nombre:string, email:string, rol:string){
        this.nombre= nombre;
        this.email= email;
        this.rol= rol;
    }

    public getNombre():string{return this.nombre;}
    public setNombre(nombre:string):void{this.nombre = nombre;}

    public getEmail():string{return this.email;}
    public setEmail(email:string):void{this.email = email;}

    public getRol():string{return this.rol;}
    public setRol(rol:string):void{this.rol = rol;}
}
