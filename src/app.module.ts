import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "process.env.MYSQL_HOST",
      "port": parseInt(process.env.MYSQL_PORT ?? "3306"),
      "username": process.env.MYSQL_USER,
      "password": process.env.MYSQL_PASSSWORD,
      "database": process.env.MYSQL_DB,
      "entities": [
        __dirname + "/**/**.entity{js,ts}"
      ],
      "synchronize": true
    }),
    UsuarioModule,
    AlumnoModule,
    EntrenadorModule,
    AsignacionModule,
    PlanModule,
    RutinaModule,
    EjercicioModule,
    SerieModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
