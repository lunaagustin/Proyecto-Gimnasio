import { Module } from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { EjercicioController } from './ejercicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrenador } from 'src/entrenador/entities/entrenador.entity';
import { Serie } from 'src/serie/entities/serie.entity';
import { Rutina } from 'src/rutina/entities/rutina.entity';
import { Ejercicio } from './entities/ejercicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ejercicio,Entrenador,Serie,Rutina])],
  controllers: [EjercicioController],
  providers: [EjercicioService],
})
export class EjercicioModule {}
