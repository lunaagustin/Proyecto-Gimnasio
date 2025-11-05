import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Entrenador } from "src/entrenador/entities/entrenador.entity";
import { Alumno } from "src/alumno/entities/alumno.entity";

export enum Rol {
    ALUMNO = "alumno",
    ENTRENADOR = "entrenador",
    ADMIN = "admin",
}

@Entity('usuario')
export class Usuario {

    @PrimaryGeneratedColumn()
    idUsuario: number;

    @Column()
    nombre: string;

    @Column({ unique: true })
    email: string;

    @Column({
        type: "enum",
        enum: Rol
    })
    rol: Rol;

    @OneToMany(() => Entrenador, entrenador => entrenador.idUsuario)
    entrenadores: Entrenador[];

    @OneToMany(() => Alumno, alumno => alumno.idUsuario)
    alumnos: Alumno[];
}

