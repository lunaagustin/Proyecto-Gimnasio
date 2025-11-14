import { Module } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { Ejercicio } from 'src/ejercicio/entities/ejercicio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from './entities/serie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Serie,Ejercicio])],
  controllers: [SerieController],
  providers: [SerieService],
})
export class SerieModule {}
