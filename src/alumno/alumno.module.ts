import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entrenador } from 'src/entrenador/entities/entrenador.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,Entrenador,Plan,Asignacion])],
  controllers: [AlumnoController],
  providers: [AlumnoService],
})
export class AlumnoModule {}
