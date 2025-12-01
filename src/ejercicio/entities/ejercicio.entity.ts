import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entrenador } from "../../entrenador/entities/entrenador.entity";
import { Serie } from "../../serie/entities/serie.entity";
import { Rutina } from "../../rutina/entities/rutina.entity";

@Entity('ejercicio')
export class Ejercicio {

    @PrimaryGeneratedColumn()
    idEjercicio: number;

    @Column()
    nombre: string;

    @Column({ type: 'text' })
    instrucciones: string;

    @Column()
    equipamiento: string;

    @Column({ name: "identrenador" })
    idEntrenador: number;

    @ManyToOne(() => Entrenador, entrenador => entrenador.ejercicios)
    @JoinColumn({ name: "identrenador" })
    entrenador: Entrenador;

    @OneToMany(() => Serie, serie => serie.ejercicio)
    series: Serie[];

    @ManyToMany(() => Rutina, rutina => rutina.ejercicios)
    rutinas: Rutina[];
}
