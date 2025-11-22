import { Column, Entity, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";
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
    lesiones?: string;

    @Column({ name: 'idusuario' })
    idUsuario: number;

    @OneToOne(() => Usuario, usuario => usuario.alumno)
    @JoinColumn({ name: 'idusuario' })
    usuario: Usuario;

    @Column({ name: 'identrenador' })
    idEntrenador: number;

    @ManyToOne(() => Entrenador, entrenador => entrenador.alumnos)
    @JoinColumn({ name: 'identrenador' })
    entrenador: Entrenador;

    @Column({ name: 'idplan' })
    idPlan: number;

    @ManyToOne(() => Plan, plan => plan.alumnos)
    @JoinColumn({ name: 'idplan' })
    plan: Plan;

    @OneToMany(() => Asignacion, asign => asign.alumno)
    asignaciones: Asignacion[];
}
