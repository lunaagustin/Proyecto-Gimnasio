import { Module } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { Ejercicio } from '../ejercicio/entities/ejercicio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from '../serie/entities/serie.entity';
import { EjercicioModule } from '../ejercicio/ejercicio.module';

@Module({
  imports: [TypeOrmModule.forFeature([Serie,Ejercicio]), EjercicioModule],
  controllers: [SerieController],
  providers: [SerieService],
})
export class SerieModule {}
