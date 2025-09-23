import { Ejercicio } from "src/ejercicio/entities/ejercicio.entity";
import { Entrenador } from "src/entrenador/entities/entrenador.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('serie')
export class Serie {
    @PrimaryGeneratedColumn()
    idSerie:number;

    @Column()
    repeticiones:number;

    @Column()
    peso:number;

    @Column()
    descanso:number;

    @ManyToOne(()=> Ejercicio, ejercicio => ejercicio.series)
    @JoinColumn()
    idEjercicio:Entrenador;

    constructor(repeticiones:number, peso:number, descanso:number){
        this.repeticiones= repeticiones;
        this.peso= peso;
        this.descanso= descanso;
    }

    public getRepeticiones():number{return this.repeticiones;}
    public setRepeticiones(repeticiones:number):void{this.repeticiones = repeticiones;}

    public getPeso():number{return this.peso;}
    public setPeso(peso:number):void{this.peso = peso;}

    public getDescanso():number{return this.descanso;}
    public setDescanso(descanso:number):void{this.descanso = descanso;}
}
