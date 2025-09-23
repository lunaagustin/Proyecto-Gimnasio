import { Entrenador } from "src/entrenador/entities/entrenador.entity";
import { Serie } from "src/serie/entities/serie.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ejercicio')
export class Ejercicio {
    @PrimaryGeneratedColumn()
    idEjercicio:number;

    @Column()
    nombre:string;

    @Column()
    instrucciones:string;

    @Column()
    equipamiento:string;

    @OneToMany(()=> Serie, serie => serie.idEjercicio)
    series:Serie[];

    @ManyToOne(()=> Entrenador, entrenador => entrenador.ejercicios)
    @JoinColumn()
    idEntrenador:Entrenador;

    constructor(nombre:string, instrucciones:string, equipamiento:string){
        this.nombre= nombre;
        this.instrucciones= instrucciones;
        this.equipamiento= equipamiento;
    }

    public getNombre():string{return this.nombre;}
    public setNombre(nombre:string):void{this.nombre = nombre;}

    public getInstrucciones():string{return this.instrucciones;}
    public setInstrucciones(instrucciones:string):void{this.instrucciones = instrucciones}

    public getEquipamiento():string{return this.equipamiento;}
    public setEquipamiento(equipamiento:string):void{this.equipamiento = equipamiento;}
}
