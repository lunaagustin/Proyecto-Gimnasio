import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ejercicio } from "src/ejercicio/entities/ejercicio.entity";

@Entity('serie')
export class Serie {

    @PrimaryGeneratedColumn()
    idSerie: number;

    @Column()
    repeticiones: number;

    @Column({ type: "decimal" })
    peso: number;

    @Column()
    descanso: number;

    @Column({ name: "idejercicio" })
    idEjercicio: number;

    @ManyToOne(() => Ejercicio, ejercicio => ejercicio.series)
    @JoinColumn({ name: "idejercicio" })
    ejercicio: Ejercicio;
}
