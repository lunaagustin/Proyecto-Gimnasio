import { Module } from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { RutinaController } from './rutina.controller';
import { Entrenador } from '../entrenador/entities/entrenador.entity';
import { Asignacion } from '../asignacion/entities/asignacion.entity';
import { Ejercicio } from '../ejercicio/entities/ejercicio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rutina } from '../rutina/entities/rutina.entity';
import { EntrenadorModule } from '../entrenador/entrenador.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rutina,Entrenador,Asignacion,Ejercicio]),UsuarioModule, EntrenadorModule],
  controllers: [RutinaController],
  providers: [RutinaService],
})
export class RutinaModule {}
