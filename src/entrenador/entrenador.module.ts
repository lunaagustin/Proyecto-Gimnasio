import { Module } from '@nestjs/common';
import { EntrenadorService } from './entrenador.service';
import { EntrenadorController } from './entrenador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Alumno } from '../alumno/entities/alumno.entity';
import { Rutina } from '../rutina/entities/rutina.entity';
import { Ejercicio } from '../ejercicio/entities/ejercicio.entity';
import { Entrenador } from '../entrenador/entities/entrenador.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entrenador,Usuario,Alumno,Rutina,Ejercicio]), UsuarioModule], /*entidades que voy a estar utilizando*/
  controllers: [EntrenadorController],
  providers: [EntrenadorService],
  exports: [EntrenadorService]
})
export class EntrenadorModule {}
