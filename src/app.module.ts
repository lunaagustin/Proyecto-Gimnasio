import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { AlumnoModule } from './alumno/alumno.module';
import { EntrenadorModule } from './entrenador/entrenador.module';
import { AsignacionModule } from './asignacion/asignacion.module';
import { PlanModule } from './plan/plan.module';
import { RutinaModule } from './rutina/rutina.module';
import { EjercicioModule } from './ejercicio/ejercicio.module';
import { SerieModule } from './serie/serie.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "root",
      "database": "gimnasio",
      "entities": [
        "dist/**/**.entity{.ts,.js}"
      ],
      "synchronize": false
    }),
    UsuarioModule,
    AlumnoModule,
    EntrenadorModule,
    AsignacionModule,
    PlanModule,
    RutinaModule,
    EjercicioModule,
    SerieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
