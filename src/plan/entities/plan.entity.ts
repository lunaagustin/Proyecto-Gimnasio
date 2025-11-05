import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alumno } from "src/alumno/entities/alumno.entity";

@Entity('plan')
export class Plan {

    @PrimaryGeneratedColumn()
    idPlan: number;

    @Column()
    tipo: string;

    @Column({ type: "decimal" })
    precio: number;

    @OneToMany(() => Alumno, alumno => alumno.idPlan)
    alumnos: Alumno[];
}
