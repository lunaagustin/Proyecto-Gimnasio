import { Column, Entity, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { Entrenador } from "src/entrenador/entities/entrenador.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { Ejercicio } from "src/ejercicio/entities/ejercicio.entity";

@Entity('rutina')
export class Rutina {

    @PrimaryGeneratedColumn()
    idRutina: number;

    @Column()
    nombre: string;

    @Column({ type: 'text' })
    descripcion: string;

    /*@ManyToOne(() => Entrenador, entrenador => entrenador.rutinas)
    @JoinColumn()
    idEntrenador: Entrenador;

    @OneToMany(() => Asignacion, asignacion => asignacion.idRutina)
    asignaciones: Asignacion[];

    @ManyToMany(() => Ejercicio, ejercicio => ejercicio.rutinas)
    @JoinTable()   // genera la tabla intermedia
    ejercicios: Ejercicio[];*/
}

