import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Entrenador } from '../entrenador/entities/entrenador.entity';
import { Plan } from '../plan/entities/plan.entity';
import { Asignacion } from '../asignacion/entities/asignacion.entity';
import { Alumno } from '../alumno/entities/alumno.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { EntrenadorModule } from 'src/entrenador/entrenador.module';
import { PlanModule } from 'src/plan/plan.module';

@Module({
  imports: [TypeOrmModule.forFeature([Alumno,Usuario,Entrenador,Plan,Asignacion]), 
  UsuarioModule, EntrenadorModule, PlanModule],
  controllers: [AlumnoController],
  providers: [AlumnoService],
})
export class AlumnoModule {}
