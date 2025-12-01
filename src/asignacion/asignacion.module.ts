import { Module } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { AsignacionController } from './asignacion.controller';
import { Rutina } from '../rutina/entities/rutina.entity';
import { Alumno } from '../alumno/entities/alumno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignacion } from '../asignacion/entities/asignacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asignacion,Rutina,Alumno])],
  controllers: [AsignacionController],
  providers: [AsignacionService],
})
export class AsignacionModule {}
