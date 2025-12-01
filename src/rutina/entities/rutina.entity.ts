import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Entrenador } from '../../entrenador/entities/entrenador.entity';
import { Asignacion } from '../../asignacion/entities/asignacion.entity';
import { Ejercicio } from '../../ejercicio/entities/ejercicio.entity';

@Entity('rutina')
export class Rutina {
  @PrimaryGeneratedColumn()
  idRutina: number;

  @Column()
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @ManyToOne(() => Entrenador, (entrenador) => entrenador.rutinas)
  @JoinColumn({ name: 'identrenador' })
  entrenador: Entrenador;

  @OneToMany(() => Asignacion, (asignacion) => asignacion.rutina)
  asignaciones: Asignacion[];

  @ManyToMany(() => Ejercicio, (ejercicio) => ejercicio.rutinas)
  @JoinTable({
    name: 'ejercicio_has_rutina', /*le pongo el nombre manualmente*/ 
    joinColumn: { name: 'idRutina' },
    inverseJoinColumn: { name: 'idEjercicio' },
  })
  ejercicios: Ejercicio[];
}
