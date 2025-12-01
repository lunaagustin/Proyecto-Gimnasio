import { Module } from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { EjercicioController } from './ejercicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrenador } from '../entrenador/entities/entrenador.entity';
import { Serie } from '../serie/entities/serie.entity';
import { Rutina } from '../rutina/entities/rutina.entity';
import { Ejercicio } from '../ejercicio/entities/ejercicio.entity';
import { EntrenadorModule } from '../entrenador/entrenador.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ejercicio,Entrenador,Serie,Rutina]), EntrenadorModule],
  controllers: [EjercicioController],
  providers: [EjercicioService],
  exports: [EjercicioService]
})
export class EjercicioModule {}
