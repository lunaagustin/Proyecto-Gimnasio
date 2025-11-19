import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entrenador } from "src/entrenador/entities/entrenador.entity";
import { Serie } from "src/serie/entities/serie.entity";
import { Rutina } from "src/rutina/entities/rutina.entity";

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

   @ManyToOne(() => Entrenador, entrenador => entrenador.ejercicios)
    @JoinColumn()
    entrenador: Entrenador;

    @OneToMany(() => Serie, serie => serie.ejercicio)
    series: Serie[];

    @ManyToMany(() => Rutina, rutina => rutina.ejercicios)
    rutinas: Rutina[];
}

