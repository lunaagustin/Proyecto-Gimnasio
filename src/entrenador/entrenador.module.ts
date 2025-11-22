import { Module } from '@nestjs/common';
import { EntrenadorService } from './entrenador.service';
import { EntrenadorController } from './entrenador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Rutina } from 'src/rutina/entities/rutina.entity';
import { Ejercicio } from 'src/ejercicio/entities/ejercicio.entity';
import { Entrenador } from './entities/entrenador.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entrenador,Usuario,Alumno,Rutina,Ejercicio]), UsuarioModule], /*entidades que voy a estar utilizando*/
  controllers: [EntrenadorController],
  providers: [EntrenadorService],
  exports: [EntrenadorService]
})
export class EntrenadorModule {}
