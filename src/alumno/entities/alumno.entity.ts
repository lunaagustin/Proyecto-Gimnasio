import { Column, Entity, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Entrenador } from "src/entrenador/entities/entrenador.entity";
import { Plan } from "src/plan/entities/plan.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";

@Entity('alumno')
export class Alumno {

    @PrimaryGeneratedColumn()
    idAlumno: number;

    @Column({ type: "decimal" })
    peso: number;

    @Column({ type: "decimal" })
    altura: number;

    @Column({ type: 'date' })
    fechaInicio: string;

    @Column({ nullable: true })
    lesiones: string;

    @ManyToOne(() => Usuario, usuario => usuario.alumnos)
    @JoinColumn()
    idUsuario: Usuario;

    @ManyToOne(() => Entrenador, entrenador => entrenador.alumnos)
    @JoinColumn()
    idEntrenador: Entrenador;

    @ManyToOne(() => Plan, plan => plan.alumnos)
    @JoinColumn()
    idPlan: Plan;

    @OneToMany(() => Asignacion, asign => asign.idAlumno)
    asignaciones: Asignacion[];
}

