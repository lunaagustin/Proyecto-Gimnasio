import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    /*@OneToOne(() => Usuario, usuario => usuario.entrenadores)
    @JoinColumn()
    idUsuario: Usuario;

    @OneToMany(() => Alumno, alumno => alumno.idEntrenador)
    alumnos: Alumno[];

    @OneToMany(() => Rutina, rutina => rutina.entrenador)
    rutinas: Rutina[];

    @OneToMany(() => Ejercicio, ejercicio => ejercicio.idEntrenador)
    ejercicios: Ejercicio[];*/
}
