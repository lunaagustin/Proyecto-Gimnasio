import { Module } from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { RutinaController } from './rutina.controller';
import { Entrenador } from 'src/entrenador/entities/entrenador.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';
import { Ejercicio } from 'src/ejercicio/entities/ejercicio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rutina } from './entities/rutina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rutina,Entrenador,Asignacion,Ejercicio])],
  controllers: [RutinaController],
  providers: [RutinaService],
})
export class RutinaModule {}
