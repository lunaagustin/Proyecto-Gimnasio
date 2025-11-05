import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rutina } from "src/rutina/entities/rutina.entity";
import { Alumno } from "src/alumno/entities/alumno.entity";

@Entity('asignacion')
export class Asignacion {

    @PrimaryGeneratedColumn()
    idAsignacion: number;

    @Column({ type: 'date' })
    fechaAsignada: string;

    @Column()
    estado: string;

    @ManyToOne(() => Rutina, rutina => rutina.asignaciones)
    @JoinColumn()
    idRutina: Rutina;

    @ManyToOne(() => Alumno, alumno => alumno.asignaciones)
    @JoinColumn()
    idAlumno: Alumno;
}
