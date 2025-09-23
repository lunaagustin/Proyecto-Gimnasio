import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { Ejercicio } from "src/ejercicio/entities/ejercicio.entity";
import { Entrenador } from "src/entrenador/entities/entrenador.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('rutina')
export class Rutina {
    @PrimaryGeneratedColumn()
    idRutina:number;

    @Column()
    nombre:string;

    @Column()
    descripcion:string;

    @ManyToOne(()=> Entrenador, entrenador => entrenador.rutinas)
    @JoinColumn()
    idEntrenador:Entrenador;

    @OneToMany(()=> Asignacion, asignacion => asignacion.idRutina)
    asignaciones:Asignacion[];

    @ManyToMany(type => Ejercicio)
    @JoinTable()
    ejercicios:Ejercicio[];

    constructor(nombre:string, descripcion:string){
        this.nombre= nombre;
        this.descripcion= descripcion;
    }

    public getNombre():string{return this.nombre;}
    public setNombre(nombre:string):void{this.nombre = nombre;}

    public getDescripcion():string{return this.descripcion;}
    public setDescripcion(descripcion:string):void{this.descripcion = descripcion;}

}
