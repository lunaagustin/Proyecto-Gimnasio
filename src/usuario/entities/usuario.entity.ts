import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Entrenador } from 'src/entrenador/entities/entrenador.entity';
import { Alumno } from 'src/alumno/entities/alumno.entity';

export enum Rol {
  ALUMNO = 'alumno',
  ENTRENADOR = 'entrenador',
  ADMIN = 'admin',
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contraseña: string;

  @Column({
    type: 'enum',
    enum: Rol,
  })
  rol: Rol;

  @OneToOne(() => Entrenador, (entrenador) => entrenador.usuario)
  entrenador: Entrenador;

  @OneToOne(() => Alumno, (alumno) => alumno.usuario)
  alumno: Alumno;
}
