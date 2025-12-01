import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Alumno } from "../../alumno/entities/alumno.entity";
import { Rutina } from "../../rutina/entities/rutina.entity";
import { Ejercicio } from "../../ejercicio/entities/ejercicio.entity";

@Entity('entrenador')
export class Entrenador {

    @PrimaryGeneratedColumn()
    idEntrenador: number;

    @Column()
    cvCertificacion: string;
    
    @Column({name: "idusuario"})
    idUsuario: number; 

    @OneToOne(() => Usuario, usuario => usuario.entrenador)
    @JoinColumn({ name: "idusuario" })
    usuario: Usuario;


    @OneToMany(() => Alumno, alumno => alumno.entrenador)
    alumnos: Alumno[];

    @OneToMany(() => Rutina, rutina => rutina.entrenador)
    rutinas: Rutina[];

    @OneToMany(() => Ejercicio, ejercicio => ejercicio.entrenador)
    ejercicios: Ejercicio[];
}
