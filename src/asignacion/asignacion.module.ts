import { Module } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { AsignacionController } from './asignacion.controller';
import { Rutina } from 'src/rutina/entities/rutina.entity';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignacion } from './entities/asignacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asignacion,Rutina,Alumno])],
  controllers: [AsignacionController],
  providers: [AsignacionService],
})
export class AsignacionModule {}
