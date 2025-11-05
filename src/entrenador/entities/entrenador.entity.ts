import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Alumno } from "src/alumno/entities/alumno.entity";
import { Rutina } from "src/rutina/entities/rutina.entity";
import { Ejercicio } from "src/ejercicio/entities/ejercicio.entity";

@Entity('entrenador')
export class Entrenador {

    @PrimaryGeneratedColumn()
    idEntrenador: number;

    @Column()
    cvCertificacion: string;

    @ManyToOne(() => Usuario, usuario => usuario.entrenadores)
    @JoinColumn()
    idUsuario: Usuario;

    @OneToMany(() => Alumno, alumno => alumno.idEntrenador)
    alumnos: Alumno[];

    @OneToMany(() => Rutina, rutina => rutina.idEntrenador)
    rutinas: Rutina[];

    @OneToMany(() => Ejercicio, ejercicio => ejercicio.idEntrenador)
    ejercicios: Ejercicio[];
}
