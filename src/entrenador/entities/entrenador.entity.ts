import { Alumno } from "src/alumno/entities/alumno.entity";
import { Ejercicio } from "src/ejercicio/entities/ejercicio.entity";
import { Rutina } from "src/rutina/entities/rutina.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('entrenador')
export class Entrenador {
    @PrimaryGeneratedColumn()
    idEntrenador:number;

    @Column()
    cvCertificacion:string;

    @OneToOne(()=>Usuario)
    @JoinColumn()
    rol:Usuario;

    @OneToMany(()=> Alumno, alumnos => alumnos.idEntrenador)
    alumnos:Alumno[];

    @OneToMany(()=> Ejercicio, ejercicio => ejercicio.idEntrenador)
    ejercicios:Ejercicio[];

    @OneToMany(()=> Rutina, rutina => rutina.idEntrenador)
    rutinas:Rutina[];

    constructor(cvCertificacion:string){
        this.cvCertificacion= cvCertificacion;
    }

    public getCvCertificacion():string{return this.cvCertificacion;}
    public setCvCertificacion(cvCertificacion:string):void{this.cvCertificacion = cvCertificacion;}
}
